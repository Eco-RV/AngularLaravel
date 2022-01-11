<?php

namespace App\Tablas\Desglose;

use Illuminate\Http\Request;
use App\Tablas\Desglose\Desglose;
use App\Tablas\Facturas\Facturas;
use Illuminate\Support\Facades\DB;
use App\Tablas\Productos\Productos;
use App\Http\Controllers\Controller;

class DesgloseController extends Controller
{
    public function create(Request $request) //Crea los desglose de una factura y los almacena en la BD
    {
        $cant = DB::table('agenda.productos')->latest()->where('id', '=', $request['producto_id'])->get()->toArray();
        $cantp = $request['cantidad'];
        $cantp = (int) $cantp;

        $cant = $cant[0];
        $cant = (int)$cant->cant;
        if ($cant < $cantp) {//Valida que haya inventario disponible
            return false;
        } else {
            $datafac = Facturas::latest()->get(); // Relaciona el desglose con su factura correspondiente
            $datafac =  $datafac[0];
            $data['facturas_id'] = $datafac['id'];
            $data['producto_id'] = $request['producto_id'];
            $data['cantidad'] = $request['cantidad'];
            $data['pre_tot'] = $request['pre_tot'];
            Desglose::create($data);  //Crea el desglose
            DB::table('agenda.productos')->where('id', '=', $request['producto_id'])->decrement('cant', $request['cantidad']); //Altera la cantidad de productos
            return response()->json([
                'message' => "Creado correctamente",
                'success' => true
            ], 200);
        }
    }
}
