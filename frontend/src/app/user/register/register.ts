import { Component } from '@angular/core';
import { UserService } from '../../services/user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Registercomponent {
 user: any = {};

  constructor(private service: UserService, private router: Router) {}

  register() {

    this.service.register(this.user).subscribe(() => {
      alert("Registered successfully");
      this.router.navigate(['/login']);
    }, err => {
      alert("Registration failed");
    });
  }
  goToLogin() {
  this.router.navigate(['/login']);
}
}
