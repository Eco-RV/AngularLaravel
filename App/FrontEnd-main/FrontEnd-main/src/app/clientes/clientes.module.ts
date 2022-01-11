import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing.module';

import { CheckoutComponent } from './checkout/checkout.component';
import { ListaproductosComponent } from './listaproductos/listaproductos.component';
import { PdfComponent } from './pdf/pdf.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    ListaproductosComponent,
    PdfComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
