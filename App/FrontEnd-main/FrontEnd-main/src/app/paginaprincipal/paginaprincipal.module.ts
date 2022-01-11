import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PaginaPrincipalRoutingModule } from './paginaprincipal-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    PaginaPrincipalRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PaginaPrincipalModule { }
