import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  username: string = '';

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef,) {}

  ngOnInit() {
  let userStr = localStorage.getItem("user");

  if (!userStr) {
    alert("User not logged in");
    this.router.navigate(['/login']);
    return;
  }

  let user = JSON.parse(userStr);

  this.username = user.firstName;

  this.loadCart(user.id);
}

  loadCart(userId: number) {
    this.http.get(`http://localhost:8084/cart/${userId}`)
      .subscribe((res: any) => {
        this.cartItems = res;
      });
       this.cdr.detectChanges();
  }


  increaseQty(item: any) {
    item.quantity++;
  }

  
  decreaseQty(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }


  removeItem(id: number) {
    this.http.delete(`http://localhost:8084/cart/${id}`)
      .subscribe(() => {
        this.cartItems = this.cartItems.filter(p => p.id !== id);
      });
  }

  
  getTotal() {
    return this.cartItems.reduce((sum, item) =>
      sum + (item.price * item.quantity), 0);
  }

  checkout() {
    let user = JSON.parse(localStorage.getItem("user")!);

    this.http.post(`http://localhost:8084/order?userId=${user.id}`, {})
      .subscribe(() => {
        alert("Order placed successfully!");

        this.cartItems = [];
        this.router.navigate(['/catalog']);
      });
  }

  goBack() {
    window.history.back();
  }
}