import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [RouterModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.authService.user$.subscribe(
      user => this.user = user
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
