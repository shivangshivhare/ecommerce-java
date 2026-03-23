import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-checkout.html',
  styleUrl: './payment-checkout.css',
})
export class PaymentCheckoutComponent implements OnInit {

  order: any = { items: [], totalAmount: 0 };
  paymentMethod: string = 'card';
  message: string = '';
  isLoading = true;
  isPaying = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  
  loadCart() {
    let user = JSON.parse(localStorage.getItem("user")!);

    this.http.get<any[]>(`http://localhost:8080/cart/${user.id}`)
      .subscribe({
        next: (res) => {
          console.log("Cart:", res);

          this.order.items = res || [];

          this.order.totalAmount = this.order.items
            .reduce((sum: number, item: any) =>
              sum + (item.price * item.quantity), 0);

          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }

  // 🔥 PAYMENT → CREATE ORDER
  pay() {

    let user = JSON.parse(localStorage.getItem("user")!);

    this.isPaying = true;
    this.message = "Processing Payment...";
    this.cdr.detectChanges();

    this.http.post("http://localhost:8080/order", {
      userId: user.id
    })
    .subscribe({
      next: () => {

        this.message = "Payment Successful";
        this.isPaying = false;

        this.cdr.detectChanges();

        // redirect to orders
        setTimeout(() => {
          this.router.navigate(['/orders']);
        }, 1000);
      },
      error: (err) => {
        console.error(err);
        this.message = "Payment Failed";
        this.isPaying = false;
        this.cdr.detectChanges();
      }
    });
  }
}