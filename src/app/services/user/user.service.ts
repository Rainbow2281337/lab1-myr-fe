import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegData, UserRegPayload } from '../interfaces/UserRegData';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'http://localhost:3000/user';

  constructor(private readonly http: HttpClient) {}

  regUser(userData: UserRegData): Observable<UserRegPayload> {
    return this.http.post<UserRegPayload>(`${this.apiUrl}`, userData).pipe(
      tap((response) => {
        if (response.id) {
          localStorage.setItem('id', response.id);
        }
      }),
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  logInUser(userData: Partial<UserRegData>): Observable<UserRegPayload> {
    return this.http
      .post<UserRegPayload>(`${this.apiUrl}/login`, userData)
      .pipe(
        tap((response) => {
          if (response.id) {
            localStorage.setItem('id', response.id);
          }
        }),
        catchError((err) => {
          console.error(err);
          throw err;
        })
      );
  }
}
