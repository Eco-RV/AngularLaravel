import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutComponent } from './checkout/checkout.component';
import { ListaproductosComponent } from './listaproductos/listaproductos.component';
import { PdfComponent } from './pdf/pdf.component';


const routes: Routes = [
  { path: '', redirectTo : 'producto/lista/0', pathMatch: 'full'},
  { path: 'producto/lista', redirectTo : 'producto/lista/0', pathMatch: 'full'},
  { path: 'producto/lista/:productoId', component: ListaproductosComponent },
  { path: 'producto/checkout', component: CheckoutComponent },
  { path: 'producto/pdf', component: PdfComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
