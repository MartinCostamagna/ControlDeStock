import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, tap, catchError, of } from 'rxjs';
import { LoginCredentials } from '../interfaces/login-credentials.interface';

interface AuthStatus {
  isAuthenticated: boolean;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/auth';
  private authStatusSubject = new BehaviorSubject<boolean>(false);
  public authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials, { 
      withCredentials: true 
    });
  }

  checkAuth(): Observable<boolean> {
    return this.http.get<AuthStatus>(`${this.baseUrl}/status`, { withCredentials: true }).pipe(
      map(status => {
        this.authStatusSubject.next(status.isAuthenticated);
        return status.isAuthenticated;
      }),
      catchError(() => {
        this.authStatusSubject.next(false);
        return of(false);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => this.authStatusSubject.next(false))
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.checkAuth();
  }
}

