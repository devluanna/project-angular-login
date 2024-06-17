import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../app/types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = "http://localhost:8080/api/user/u/";

  constructor(private httpClient: HttpClient) { }

  getUserInfo(userId: string) {
    return this.httpClient.get<any>(`${this.apiUrl}${userId}`).pipe(
     
    );
  }
}