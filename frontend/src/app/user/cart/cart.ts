import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { ChangeDetectorRef } from '@angular/core';

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
  totalAmount: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem("user")!);
    this.username = user?.name || user?.username || 'User';
    this.loadCart();
  }

  loadCart() {
    let user = JSON.parse(localStorage.getItem("user")!);

    this.cartService.getCart(user.id)
      .subscribe((res: any[]) => {
        this.cartItems = res;
        this.calculateTotal();
        this.cdr.detectChanges();
      });
  }

  calculateTotal() {
    this.totalAmount = 0;
    for (let item of this.cartItems) {
      this.totalAmount += item.price * item.quantity;
    }
  }

  removeItem(id: number) {
    this.cartService.deleteItem(id)
      .subscribe(() => this.loadCart());
  }

  increaseQty(item: any) {
    this.cartService.updateQty(item.id, item.quantity + 1)
      .subscribe(() => {
        item.quantity++;
        this.calculateTotal();
      });
  }

  decreaseQty(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateQty(item.id, item.quantity - 1)
        .subscribe(() => {
          item.quantity--;
          this.calculateTotal();
        });
    }
  }
  checkout() {
    this.router.navigate(['/checkout']);
  }

  goBack() {
    this.router.navigate(['/catalog']);
  }
}