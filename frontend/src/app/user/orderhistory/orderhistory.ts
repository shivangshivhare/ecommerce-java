import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orderhistory.html',
  styleUrls: ['./orderhistory.css']
})
export class OrderHistoryComponent implements OnInit {

  orders: any[] = [];
  username: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.username = localStorage.getItem("username") || "User";

    const data = localStorage.getItem("orders");
    this.orders = data ? JSON.parse(data) : [];
  }

  cancelOrder(order: any) {
    if (order.status === 'COMPLETED' || order.status === 'CANCELLED') return;

    order.status = 'CANCELLED';
    this.updateOrders();
  }

  updateOrders() {
    localStorage.setItem("orders", JSON.stringify(this.orders));
    this.orders = [...this.orders]; // refresh UI
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  goBack() {
    this.router.navigate(['/catalog']);
  }
}