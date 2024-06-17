import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = {
    first_name: '',
    last_name: ''
  };

  
  setUser(firstName: string, lastName: string): void {
    this.user.first_name = firstName;
    this.user.last_name = lastName;
    console.log(firstName)
  }

  
  getFirstName(): string {
    return this.user.first_name;
  }


  getLastName(): string {
    return this.user.last_name;
  }

  constructor() {}

  isAuthenticated(): boolean {
    const authToken = sessionStorage.getItem('auth-token');
    return !!authToken;
  }

  getUsername(): string | null {
    const username = sessionStorage.getItem('username');
    return username !== null ? username : null;
  }

}