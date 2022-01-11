<?php

namespace App\Tablas\Usuarios;

use Illuminate\Http\Request;
use App\Tablas\Usuarios\Usuarios;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Tablas\Facturas\Facturas;
use App\Tablas\Facturas\FacturasController;
use Illuminate\Support\Facades\Mail;

Use Log;

class UsuariosController extends Controller
{
    public function getAll()
    {
        $data = Usuarios::get();
        return response()->json($data, 200);
    }
    public function getRole($id){
        $user = Usuarios::where('id',$id)->get();
        if ($user[0]->hasRole('cliente')) {
            return response()->json($data['cat']='Cliente');
        }
        if ($user[0]->hasRole('admin')) {
            return response()->json($data['cat']='Administrativo');
        }
        if ($user[0]->hasRole('superusuario')) {
            return response()->json($data['cat']='SuperUsuario');
        }
    }

    public function create(Request $request){ //Crea los usuario
        $data['id'] = $request['id'];
        $data['nom'] = $request['nom'];
        $data['email'] = $request['email'];
        $data['ced'] = $request['ced'];
        $data['num'] = $request['num'];
        $data['dir'] = $request['dir'];
        $data['password'] = bcrypt($request['password']);
        if($request['category']=="Administrativo")
        {
            $request['category']="admin";
        }
        if($request['category']=="SuperUsuario")
        {
            $request['category']="superusuario";
        }
        if($request['category']=="Cliente" || $request['category']==null)
        {
            $request['category']="cliente";
        }
        $user = Usuarios::create($data);
        Mail::send('mails.correo_confirmacion', $data, function($message) use ($data) {
            $message->to($data['email'], $data['nom'])->subject('Cuenta Creada!');
        });
        $user->assignRole($request['category']);
        return response()->json([
            'message' => "Creado correctamente",
            'success' => true
        ], 200);
    }
    public function update(Request $request){ //Crea los usuario
        $data['id'] = $request['id'];
        $data['nom'] = $request['nom'];
        $data['email'] = $request['email'];
        $data['ced'] = $request['ced'];
        $data['num'] = $request['num'];
        $data['dir'] = $request['dir'];
        $data['password'] = bcrypt($request['password']);
        if($request['category']=="Administrativo")
        {
            $request['category']="admin";
        }
        if($request['category']=="SuperUsuario")
        {
            $request['category']="superusuario";
        }
        if($request['category']=="Cliente" || $request['category']==null)
        {
            $request['category']="cliente";
        }
        DB::table('model_has_roles')->where('model_id', '=', $data['id'])->delete();
        $user = Usuarios::find($data['id']);
        $user->assignRole($request['category']);
        $user = Usuarios::find($request['id']);
        $user->nom=$data['nom'];
        $user->email=$data['email'];
        $user->ced=$data['ced'];
        $user->num=$data['num'];
        $user->dir=$data['dir'];
        $user->password=$data['password'];
        $user->save();

        return response()->json([
            'message' => "Creado correctamente",
            'success' => true
        ], 200);
    }
    public function delete($id){
        DB::table('model_has_roles')->where('model_id', '=', $id)->delete();
        $fact = Facturas::where('usuario_id',$id)->get();
        for ($i=0; $i < count($fact); $i++) {
            $f = $fact[$i];
            FacturasController::delete($f['id']);
        }
        Usuarios::where('id',$id)->delete();
        return response()->json([
            'message' => "Eliminado correctamente",
            'success' => true
        ], 200);
    }

    public function get($ced){ //Retorna un usuario por id
        $data = Usuarios::find($ced);
        return response()->json($data, 200);
    }
    public function getLastId() //Retorna el ultimo id
    {
        $data = Usuarios::latest()->get();
        $data =  $data[0];
        $res = $data['id'];
        return response()->json($res, 200);
    }
}
