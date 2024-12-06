import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterModule, FormsModule, NgIf]  // Si tu veux utiliser des modules comme FormsModule pour la gestion des formulaires, tu peux les ajouter ici
})
export class LoginComponent {
  email: string = 'admin@test.com';
  password: string = 'admin123';

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onLogin() {
    this.errorMessage = '';
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        console.log('Connexion réussie', response);
        // Redirection après connexion réussie
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erreur de connexion', err);
        this.errorMessage = err.message || 'Erreur lors du connexion';
      }
    });
  }
}
