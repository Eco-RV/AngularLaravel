<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Tablas\Desglose\Desglose;
use App\Tablas\Facturas\Facturas;
use App\Tablas\Usuarios\Usuarios;
use Spatie\Permission\Models\Role;
use App\Tablas\Productos\Productos;
use App\Tablas\Categorias\Categorias;
use Symfony\Component\HttpFoundation\File\File;


class DatabaseSeeder extends Seeder
{
    /**
     *
     * @return void
     */
    public function run()
    {

        Role::create(['name' => 'cliente']);

        Role::create(['name' => 'admin']);

        Role::create(['name' => 'superusuario']);

        $user = Usuarios::create([
            'nom'=>'Juan Perez',
            'ced'=>'123456789',
            'num'=>'12345678',
            'dir'=>'San Jose',
            'email'=>'superusuario@prueba.com',
            'password' =>bcrypt("superusuario")
        ]);
        $user->assignRole('superusuario');
        $user = Usuarios::create([
            'nom'=>'Maria Perez',
            'ced'=>'123456789',
            'num'=>'12345678',
            'dir'=>'San Jose',
            'email'=>'admin@prueba.com',
            'password' =>bcrypt("admin")
        ]);
        $user->assignRole('admin');
        $user = Usuarios::create([
            'nom'=>'Juanita Perez',
            'ced'=>'123456789',
            'num'=>'12345678',
            'dir'=>'San Jose',
            'email'=>'cliente@prueba.com',
            'password' =>bcrypt("cliente")
        ]);
        $user->assignRole('cliente');
        Categorias::create([
            'nom'=>'Frutas'
        ]);
        Categorias::create([
            'nom'=>'Verdura'
        ]);
        Categorias::create([
            'nom'=>'Especias'
        ]);

        Productos::create([
            'nom'=>'Manzanas',
            'desc'=>'Fruta Proveniente del Manzano',
            'pre_uni'=>450,
            'img'=>'Manzana.jpg',
            'categoria_id'=>1,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Uvas',
            'desc'=>'Frutos de los racimos de la vid',
            'pre_uni'=>2000,
            'img'=>'Uvas.jpg',
            'categoria_id'=>1,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Bananos',
            'desc'=>'Fruto proveniente de los bananeros',
            'pre_uni'=>625,
            'img'=>'Bananos.jpg',
            'categoria_id'=>1,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Mandarina',
            'desc'=>'Fruto citrico proveniente del mandarino',
            'pre_uni'=>200,
            'img'=>'Mandarina.jpg',
            'categoria_id'=>1,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Sandia',
            'desc'=>'Fruto proveniente de la sandia',
            'pre_uni'=>550,
            'img'=>'Sandia.jpg',
            'categoria_id'=>1,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Tomate',
            'desc'=>'Fruto proveniente de Solanum lycopersicum',
            'pre_uni'=>500,
            'img'=>'tomate.jpg',
            'categoria_id'=>1,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Mango',
            'desc'=>'Fruto proveniente del Mangifera indica',
            'pre_uni'=>425,
            'img'=>'Mango.jpg',
            'categoria_id'=>1,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Naranja',
            'desc'=>'Fruto proveniente del naranjo',
            'pre_uni'=>200,
            'img'=>'Naranja.jpg',
            'categoria_id'=>1,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Zanahoria',
            'desc'=>'Verdura de la familia de los umbelíferas',
            'pre_uni'=>350,
            'img'=>'Zanahoria.jpg',
            'categoria_id'=>2,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Pepino',
            'desc'=>'Verdura de la familia Cucurbitaceae',
            'pre_uni'=>350,
            'img'=>'Pepino.jpg',
            'categoria_id'=>2,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Remolacha',
            'desc'=>'Verdura de ;a familia Amaranthaceae',
            'pre_uni'=>200,
            'img'=>'Remolacha.jpg',
            'categoria_id'=>2,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Lechuga',
            'desc'=>'Verdura de la familia Asteráceas',
            'pre_uni'=>350,
            'img'=>'Lechuga.jpg',
            'categoria_id'=>2,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Coliflor',
            'desc'=>'Verdura de la familia Brassicaceae',
            'pre_uni'=>450,
            'img'=>'Coliflor.jpg',
            'categoria_id'=>2,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Apio',
            'desc'=>'Verdura perteneciente familia de las apiáceas',
            'pre_uni'=>150,
            'img'=>'Apio.jpg',
            'categoria_id'=>2,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Cebolla',
            'desc'=>'Verdura de la familia amarilidáceas',
            'pre_uni'=>275,
            'img'=>'Cebolla.jpg',
            'categoria_id'=>2,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Brocoli',
            'desc'=>'Verdura de la familia brasicáceas',
            'pre_uni'=>125,
            'img'=>'Brocoli.jpg',
            'categoria_id'=>2,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Albahaca',
            'desc'=>'Hierba aromática de la familia lamiáceas ',
            'pre_uni'=>200,
            'img'=>'Albahaca.jpg',
            'categoria_id'=>3,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Cilantro',
            'desc'=>'Hierba aromática de la familia apiáceas',
            'pre_uni'=>200,
            'img'=>'Cilantro.jpg',
            'categoria_id'=>3,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Perejil',
            'desc'=>'Planta herbácea de la familia Apiaceae',
            'pre_uni'=>200,
            'img'=>'Perejil.jpg',
            'categoria_id'=>3,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Pimienta',
            'desc'=>'Especia de la familia de las piperácea',
            'pre_uni'=>200,
            'img'=>'Pimienta.jpg',
            'categoria_id'=>3,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Romero',
            'desc'=>'Hierba leñosa de la familia Lamiaceae',
            'pre_uni'=>200,
            'img'=>'Romero.jpg',
            'categoria_id'=>3,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Tomillo',
            'desc'=>'Hierbas perennes de la familia de las lamiáceas',
            'pre_uni'=>200,
            'img'=>'Tomillo.jpg',
            'categoria_id'=>3,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Orégano',
            'desc'=>'Especia de la familia Lamiaceae',
            'pre_uni'=>200,
            'img'=>'Oregano.jpg',
            'categoria_id'=>3,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

        Productos::create([
            'nom'=>'Paprika',
            'desc'=>'Condimento hecho a base de pimientos',
            'pre_uni'=>200,
            'img'=>'Paprica.jpg',
            'categoria_id'=>3,
            'cantlleva' => 0,
            'cant' => 20,
        ]);

    }
}
