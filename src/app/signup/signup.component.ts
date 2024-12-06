import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterData } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  registerData: RegisterData = {
    email: '',
    password: '',
    role: 'user'
  };
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister() {
    this.errorMessage = '';

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        // Redirection après inscription réussie
        this.router.navigate(['/login'], {
          queryParams: {
            registered: 'true',
            email: this.registerData.email
          }
        });
      },
      error: (error) => {
        // Gestion des erreurs
        this.errorMessage = error.message || 'Erreur lors de l\'inscription';
      }
    });
  }
}
