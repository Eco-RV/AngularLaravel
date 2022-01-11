import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Producto } from './productos';
import { Categorias } from '../categorias/categorias';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiURL = "http://localhost:8000/api/productos/";

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllCat(id): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.apiURL+'categoria/'+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(producto): Observable<Producto> {
    return this.httpClient.post<Producto>(this.apiURL+'create/new', JSON.stringify(producto), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  edit(producto): Observable<any> {
    return this.httpClient.put<any>(this.apiURL+'update/new', JSON.stringify(producto), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  aumentar(producto:Producto): Observable<Producto> {
    console.log(producto);
    return this.httpClient.put<Producto>(this.apiURL +'update/aumen',JSON.stringify(producto), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  disminuir(producto: Producto): Observable<Producto> {
    console.log(producto);
    return this.httpClient.put<Producto>(this.apiURL +'update/disminuir', producto, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id): Observable<Producto>{
    return this.httpClient.delete<Producto>(this.apiURL +'delete/'+id, this.httpOptions)
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
