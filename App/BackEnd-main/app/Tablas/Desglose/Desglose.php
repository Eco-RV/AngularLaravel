<?php

namespace App\Tablas\Desglose;


use App\Tablas\Productos\Productos;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Desglose extends Model
{
    use HasFactory;

    protected $table = "desgloses";

    protected $guarded = [];

    public function producto(){
        return $this->belongsTo(Productos::class);
    }
}
