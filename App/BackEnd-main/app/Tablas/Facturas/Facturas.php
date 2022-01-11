<?php

namespace App\Tablas\Facturas;

use App\Tablas\Desglose\Desglose;
use App\Tablas\Usuarios\Usuarios;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Facturas extends Model
{
    use HasFactory;
    protected $table = "facturas";

    protected $guarded = [];

    public function usuario(){
        return $this->belongsTo(Usuarios::class);
    }

    public function desglose(){
        return $this->hasMany(Desglose::class);
    }
}
