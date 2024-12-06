import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject, of, catchError, throwError} from 'rxjs';
import {map, tap} from 'rxjs/operators';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  status: number;
  message: string;
  data: {
    token: string;
  };
}

export interface User {
  id: number;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  postCode?: string | null;
  country?: string | null;
}

export interface UserResponse {
  status: number;
  message: string;
  data: User;
}

// Interface pour les données d'inscription
export interface RegisterData {
  email: string;
  password: string;
  role: string;
  // Ajoutez d'autres champs si nécessaire
}

// Interface pour la réponse d'inscription
export interface RegisterResponse {
  status: number;
  message: string;
  data?: {
    id?: number;
    email?: string;
  };
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:3000/login';
  private baseUrl ="http://127.0.0.1:3000";
  private tokenKey = 'auth_token';
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    // Charger l'utilisateur au démarrage si un token existe
    this.loadUserFromToken();
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials).pipe(
      tap(response => {
        if (response.data?.token) {
          this.storeToken(response.data.token);
          this.loadUserFromToken();
        }
      })
    );
  }

  // Méthode d'inscription
  register(registerData: RegisterData): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, registerData).pipe(
      tap(response => {
        // Vous pouvez ajouter une logique supplémentaire ici si nécessaire
        console.log('Inscription réussie', response);
      }),
      catchError(error => {
        // Gestion des erreurs d'inscription
        console.error('Erreur d\'inscription', error);
        return throwError(() => new Error('Échec de l\'inscription'));
      })
    );
  }

  // Méthode pour charger les informations de l'utilisateur
  loadUserFromToken(): void {
    const token = this.getToken();
    if (token) {
      this.getUserProfile().subscribe({
        next: (user) => {
          console.log('user start');
          this.userSubject.next(user);
        },
        error: () => {
          // En cas d'erreur (token invalide), déconnectez l'utilisateur
          console.log('token invalide');
          this.logout();
        }
      });
    }
  }

  // Récupérer le profil de l'utilisateur
  getUserProfile(): Observable<User> {
    return this.http.get<UserResponse>(`${this.baseUrl}/user/1`).pipe(
      map(response => response.data)
    );
  }

  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
