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
      return;
    }

    if (this.user.password && this.user.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match";
      return;
    }

    this.errorMessage = "";

    this.service.update(this.user).subscribe((res: any) => {

      localStorage.setItem("user", JSON.stringify(res));

      alert("Profile Updated Successfully");

      this.router.navigate(['/catalog']);
    });
  }

  goHome() {
    this.router.navigate(['/catalog']);
  }
}