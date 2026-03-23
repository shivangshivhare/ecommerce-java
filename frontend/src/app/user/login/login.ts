import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Logincomponent {
  email = "";
  password = "";
  remember = false;
  errorMessage = "";

  constructor(
    private service: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef   
  ) {}

  login() {
    this.errorMessage = "";

    const data = {
      email: this.email,
      password: this.password
    };

    this.service.login(data).subscribe({
      next: (res: any) => {
        console.log("LOGIN RESPONSE:", res);

        localStorage.setItem("user", JSON.stringify(res));
        localStorage.setItem("userId", res.id);
        localStorage.setItem("username", res.firstName);

        
        this.cdr.detectChanges();

        if (res.role === "ADMIN") {
          this.router.navigate(['/admin/products']);
        } else {
          this.router.navigate(['/catalog']);
        }
      },
      error: (err) => {
        this.errorMessage = "Login unsuccessful: email or password is wrong";

        
        this.cdr.detectChanges();
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  forgotPassword() {
  }
}