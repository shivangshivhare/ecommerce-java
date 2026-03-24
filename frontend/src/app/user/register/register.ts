import { Component } from '@angular/core';
import { UserService } from '../../services/user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Registercomponent {

  user: any = {};
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private service: UserService, private router: Router) {}

  register() {

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.user.email || !this.user.username || !this.user.password) {
      this.errorMessage = "Please fill required fields";
      return;
    }

    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match";
      return;
    }

    this.service.register(this.user).subscribe({
      next: () => {

        this.successMessage = "Registration successful";

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);

      },
      error: () => {
        this.errorMessage = "Registration failed";
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}