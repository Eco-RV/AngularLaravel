import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Usuario } from './usuario';
// import { Factura } from

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiURL = "http://localhost:8000/api/usuarios/";

  usua: Usuario
  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'

     })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getLastId(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.apiURL+'ultimo')
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getPermiso(id) {
    return this.httpClient.get<any>(this.apiURL+'permiso/'+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  createUsuario(usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.apiURL+'create/new', JSON.stringify(usuario), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  edit(usuario): Observable<any> {
    return this.httpClient.put<any>(this.apiURL+'update/new', JSON.stringify(usuario), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id){
    return this.httpClient.delete<Usuario>(this.apiURL +'delete/'+id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


}
