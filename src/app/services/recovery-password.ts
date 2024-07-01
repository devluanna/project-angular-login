import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecoveryPasswordService {
  apiUrl: string = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient) { }

  recoveryPassword(email: string){
    return this.httpClient.put<any>(`${this.apiUrl}/reset-password`, { email }).pipe(
      tap((response) => {
        sessionStorage.setItem("auth-token", response.token);
        sessionStorage.setItem("userId", response.id_user.toString());
      })
    );
  }
}