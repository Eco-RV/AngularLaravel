<?php

namespace App\Http\Controllers;

use App\Tablas\Facturas\FacturasController;
use Barryvdh\DomPDF\PDF;
use Illuminate\Http\Request;

class PDFController extends Controller
{
    public function PDF(){
        $fact = FacturasController::getLastPdf();
        $data = [
            'num_fac' => $fact->id,
            'nom_clie' => $fact->usuario->nom,
            'dir_clie' => $fact->usuario->dir,
            'desgloses' => $fact->desglose,
            'pre_tot' => $fact->tot
        ];

        $pdf = \PDF::loadView('Factura', $data);

        return $pdf->download('Factura.pdf');
    }
}
