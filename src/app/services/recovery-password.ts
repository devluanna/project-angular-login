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
    return this.httpClient.put(`${this.apiUrl}/reset-password`, { email }, { responseType: 'text' }).pipe(
      tap((response: string) => {
        console.log('Response from server:', response);
      })
    );
  }


}