import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/auth/login';
  private tokenKey = 'authToken';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, {
      username: credentials.email,
      password: credentials.password,
    });
  }

  getCurrentUser(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  refreshSession(
    refreshToken: string,
    expiresInMins?: number
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/refresh`,
      {
        refreshToken,
        expiresInMins: expiresInMins || 30,
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const token = localStorage.getItem(this.tokenKey);
      return !!token;
    } else return false;
  }

  setLoggedInStatus(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }

  handleLoginSuccess(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.setLoggedInStatus(true);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.setLoggedInStatus(false);
  }
}
