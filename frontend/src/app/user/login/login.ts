import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Logincomponent {
  email = "";
  password = "";
  remember = false;

  constructor(private service: UserService, private router: Router) {}

  login() {

    const data = {
      email: this.email, 
      password: this.password
    };

    this.service.login(data).subscribe((res: any) => {

      if (this.remember) {
        localStorage.setItem("user", JSON.stringify(res));
      } else {
        sessionStorage.setItem("user", JSON.stringify(res));
      }

      if (res.role === "ADMIN") {
        this.router.navigate(['/admin/products']);
      } else {
        this.router.navigate(['/catalog']);
      }

    }, err => {
      alert("Invalid credentials"); 
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  forgotPassword() {
    alert("Feature not implemented yet");
  }
}