import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  isAuthenticated(): boolean {
    const authToken = sessionStorage.getItem('auth-token');
    return !!authToken;
  }
}