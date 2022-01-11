<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\JwtAuthController;
use App\Tablas\Desglose\DesgloseController;
use App\Tablas\Facturas\FacturasController;
use App\Tablas\Usuarios\UsuariosController;
use App\Tablas\Productos\ProductosController;
use App\Tablas\Categorias\CategoriasController;
use App\Tablas\Productos\Productos;

Route::prefix('usuarios')->group(function () {
    Route::get('/', [UsuariosController::class, 'getAll']);
    Route::get('/ultimo', [UsuariosController::class, 'getLastId']);
    Route::get('/permiso/{id}', [UsuariosController::class, 'getRole']);
    Route::get('/mail', [UsuariosController::class, 'correo']);
    Route::post('/create/new', [UsuariosController::class, 'create']);
    Route::put('/update/new', [UsuariosController::class, 'update']);
    Route::delete('/delete/{id}', [UsuariosController::class, 'delete']);

});
Route::prefix('productos')->group(function () {
    Route::get('/', [ProductosController::class, 'getAll']);
    Route::get('/categoria/{id}', [ProductosController::class, 'getAllCat']);
    Route::post('/create/new', [ProductosController::class, 'create']);
    Route::put('/update/new', [ProductosController::class, 'update']);
    Route::put('/update/aumen', [ProductosController::class, 'aumentar']);
    Route::put('/update/disminuir', [ProductosController::class, 'disminuir']);
    Route::delete('/delete/{id}', [ProductosController::class, 'delete']);
});
Route::prefix('categorias')->group(function () {
    Route::get('/', [CategoriasController::class, 'getCategorias']);
});
Route::prefix('facturas')->group(function () {
    Route::get('/getAll', [FacturasController::class, 'getAll']);
    Route::get('/ultima/{id}', [FacturasController::class, 'getLast']);
    Route::get('/pdf', [PDFController::class, 'PDF']);
    Route::post('/create/factura', [FacturasController::class, 'create']);
    Route::post('/create/desgloses', [DesgloseController::class, 'create']);
    Route::delete('/delete/{id}', [FacturasController::class, 'delete']);
});
Route::prefix('imagenes')->group(function () {
    Route::get('/{img}', [ProductosController::class, 'imagen']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::get('/user', [JwtAuthController::class, 'user']);
    Route::post('/signup', [JwtAuthController::class, 'register']);
    Route::post('/signin', [JwtAuthController::class, 'login']);
    Route::post('/token-refresh', [JwtAuthController::class, 'refresh']);
    Route::post('/signout', [JwtAuthController::class, 'signout']);
    Route::post('/req-password-reset', [ResetPwdReqController::class, 'reqForgotPassword']);
    Route::post('/update-password', [UpdatePwdController::class, 'updatePassword']);
});
