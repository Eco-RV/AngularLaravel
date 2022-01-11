import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'paginaprincipal/login', component: LoginComponent, pathMatch: 'full'},
  { path: 'paginaprincipal/register', component: RegisterComponent, pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PaginaPrincipalRoutingModule { }
