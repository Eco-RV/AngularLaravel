<?php

namespace App\Tablas\Productos;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Tablas\Productos\Productos;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;

class ProductosController extends Controller
{
    public function create(Request $request){ //Crea los usuario
        $data['nom'] = $request['nom'];
        $data['desc'] = $request['desc'];
        $data['pre_uni'] = $request['pre_uni'];
        $data['cantlleva'] = 0;
        $data['cant'] = $request['can'];
        $data['img'] = "Default.jpg";
        $data['categoria_id'] = 0;
        if($request['cat']=="Frutas")
        {
            $request['cat']=1;
        }
        if($request['cat']=="Verdura")
        {
            $request['cat']=2;
        }
        if($request['cat']=="Especias")
        {
            $request['cat']=3;
        }
        $data['categoria_id'] = $request['cat'];
        Productos::create($data);
        return response()->json([
            'message' => "Creado correctamente",
            'success' => true
        ], 200);
    }
    public function update(Request $request){ //Crea los usuario
        $data['nom'] = $request['nom'];
        $data['desc'] = $request['desc'];
        $data['pre_uni'] = $request['pre_uni'];
        $data['cantlleva'] = 0;
        $data['cant'] = $request['can'];
        $data['img'] = "Default.jpg";
        if($request['cat']=="Frutas")
        {
            $request['cat']=1;
        }
        if($request['cat']=="Verdura")
        {
            $request['cat']=2;
        }
        if($request['cat']=="Especias")
        {
            $request['cat']=3;
        }
        $data['categoria_id'] = $request['cat'];
        $producto = Productos::find($request['id']);
        $producto->nom=$data['nom'];
        $producto->desc=$data['desc'];
        $producto->pre_uni=$data['pre_uni'];
        $producto->cant=$data['cant'];
        $producto->categoria_id=$data['categoria_id'];
        $producto->save();

        return response()->json([
            'message' => "Creado correctamente",
            'success' => true
        ], 200);
    }
    public function getAll()  //retorna todos los productos
    {
        $data = Productos::with('categoria')->orderBy('nom', 'ASC')->get();
        return response()->json($data, 200);
    }
    public function getAllCat($id)  //Retorna todos los productos de un categoria
    {
        $data = Productos::with('categoria')->where('categoria_id', $id)->orderBy('nom', 'ASC')->get();
        return response()->json($data, 200);
    }
    public function delete($id)
    {
        $producto = Productos::findOrFail($id);
        $producto->delete();
        return response()->json(null, 204);
    }
    public function aumentar(Request $request)
    {
        $data['id'] = $request->id;
        $data['cant'] = $request->cantlleva;
        DB::table('agenda.productos')->where('id', '=', $data['id'])->increment('cant', $data['cant']);
        return response()->json([
            'message' => "Aumentado correctamente",
            'success' => true
        ], 200);
    }
    public function disminuir(Request $request)
    {
        $data['id'] = $request->id;
        $producto = Productos::findOrFail($data['id']);
        $data['cant'] = $request->cantlleva;
        if($producto->cant<$request->cantlleva){
            $producto->cant=0;
            $producto->save();
        }
        else{
            DB::table('agenda.productos')->where('id', '=', $data['id'])->decrement('cant', $data['cant']);
        }


        return response()->json([
            'message' => "Aumentado correctamente",
            'success' => true
        ], 200);
    }
    public function imagen($fileName)  //Retorna la imagen para descargar
    {
        $path = public_path() . '/ImagenesSeeder/' . $fileName;
        return Response::download($path);
    }
}
