import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokenAuthService {

  private tokenIssuer = {
    login: 'http://127.0.0.1:8000/api/auth/signin',
    register: 'http://127.0.0.1:8000/api/usuario/create'
  }

  constructor() { }

  setTokenStorage(token){
    localStorage.setItem('auth_token', token);
  }

  getJwtToken(){
    return localStorage.getItem('auth_token');
  }

  // Validate token
  validateToken(){
     const token = this.getJwtToken();

     if(token){
       const payload = this.payload(token);
       if(payload){
         return Object.values(this.tokenIssuer).indexOf(payload.iss) > -1 ? true : false;
       }
     } else {
        return false;
     }
  }

  payload(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  // User state
  isSignedin() {
    return this.validateToken();
  }

  // Destroy token
  destroyToken(){
    localStorage.removeItem('auth_token');
  }

}
