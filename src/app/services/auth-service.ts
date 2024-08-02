import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = {
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    status: ''
  };

  constructor() {}

  setUser(firstName: string, lastName: string, email: string, role: string, status: string): void {
    this.user.first_name = firstName;
    this.user.last_name = lastName;
    this.user.email = email;
    this.user.role = role;
    this.user.status = status;
    console.log(firstName);
  }

  getFirstName(): string {
    return this.user.first_name;
  }

  getLastName(): string {
    return this.user.last_name;
  }

  getEmail(): string {
    return this.user.email;
  }

  getRole(): string {
    return this.user.role;
  }

  getStatus(): string {
    return this.user.status;
  }

  isAuthenticated(): boolean {
    const authToken = sessionStorage.getItem('auth-token');
    return !!authToken;
  }

  getUsername(): string | null {
    const username = sessionStorage.getItem('username');
    return username !== null ? username : null;
  }
}
