import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule ,CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profilecomponent implements OnInit {

  user: any = {};
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private service: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user") || "{}");
  }

  update() {

  if (!this.user.username || !this.user.email) {
    this.errorMessage = "Username and Email are required";
    this.successMessage = "";
    return;
  }

  if (this.user.password && this.user.password !== this.confirmPassword) {
    this.errorMessage = "Passwords do not match";
    this.successMessage = "";
    return;
  }

  this.errorMessage = "";
  this.successMessage = "";

  this.service.update(this.user).subscribe({
    next: (res: any) => {

      localStorage.setItem("user", JSON.stringify(res));

      this.successMessage = "Profile updated successfully";

      setTimeout(() => {
        this.router.navigate(['/catalog']);
      }, 2000);
    },

    error: () => {
      this.errorMessage = "Failed to update profile";
    }
  });
}

  goHome() {
    this.router.navigate(['/catalog']);
  }
}