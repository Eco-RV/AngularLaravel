import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Desglose, Facturas } from './facturas';
// import { Factura } from

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private apiURL = "http://localhost:8000/api/facturas/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiURL+'getAll')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getLast(user): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiURL+'ultima/'+user)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  descargaPDF(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiURL+'pdf')
    .pipe(
      catchError(this.errorHandler)
    )
  }
  createFactura(factura): Observable<Facturas> {
    return this.httpClient.post<Facturas>(this.apiURL + 'create/factura', JSON.stringify(factura), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createDesglose(desglose): Observable<Desglose> {
    return this.httpClient.post<Desglose>(this.apiURL + 'create/desgloses', JSON.stringify(desglose), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  delete(id){
    return this.httpClient.delete<Facturas>(this.apiURL +'delete/'+id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
