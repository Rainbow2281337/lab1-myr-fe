import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegData, User } from '../interfaces/UserRegData';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'http://localhost:3000/user';

  constructor(private readonly http: HttpClient) {}

  regUser(userData: UserRegData): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, userData).pipe(
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

  logInUser(userData: Partial<UserRegData>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, userData).pipe(
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

  checkIfUserExists(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/exists/${email}`).pipe(
      tap((response) => {
        if (response.id) {
          localStorage.setItem('id', response.id);
        }
      }),
      catchError((err) => {
        throw err;
      })
    );
  }

  getUserData(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  updateUser(id: string, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, userData).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }
}
