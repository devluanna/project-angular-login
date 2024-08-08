import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordService {
  apiUrl: string = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  updatePassword(password: string, confirmPassword: string) {

    const authToken = sessionStorage.getItem('auth-token');


    const idUser = this.authService.getUserId();
    if (!idUser) {
      console.error('User ID is not set.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    return this.httpClient.put(`${this.apiUrl}/password/${idUser}`, { password, confirmPassword }, { headers, responseType: 'text' }).pipe(
      tap((response: string) => {
        console.log('Response from server:', response);
      })
    );
  }
}