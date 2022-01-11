import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AdministrativoRoutingModule } from './administrativo-routing.module';

import { StockComponent } from './stock/stock.component';
import { AgregarproductoComponent } from './agregarproducto/agregarproducto.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StockComponent,
    AgregarproductoComponent,
  ],
  imports: [
    CommonModule,
    AdministrativoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdministrativoModule { }
