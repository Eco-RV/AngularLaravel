import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockComponent } from './stock/stock.component';
import { AgregarproductoComponent } from './agregarproducto/agregarproducto.component';

const routes: Routes = [
  { path: 'admin/stock', component: StockComponent, pathMatch: 'full'},
  { path: 'admin/stock/agregar', component: AgregarproductoComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AdministrativoRoutingModule { }
