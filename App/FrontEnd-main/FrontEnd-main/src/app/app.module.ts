import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdministrativoModule } from './administrativo/administrativo.module';
import { ClientesModule } from './clientes/clientes.module';
import { SuperusuarioModule } from './superusuario/superusuario.module';
import { PaginaPrincipalModule } from './paginaprincipal/paginaprincipal.module';


import { AuthHeaderInterceptor } from './service/shared/auth-header.interceptor';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    AdministrativoModule,
    ReactiveFormsModule,
    ClientesModule,
    SuperusuarioModule,
    PaginaPrincipalModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
