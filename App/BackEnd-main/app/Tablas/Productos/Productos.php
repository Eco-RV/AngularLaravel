<?php

namespace App\Tablas\Productos;


use App\Tablas\Categorias\Categorias;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Productos extends Model
{
    use HasFactory;
    protected $table = "productos";

    protected $guarded = [];
    public $timestamps = false;
    public function categoria(){
        return $this->belongsTo(Categorias::class);
    }
}
