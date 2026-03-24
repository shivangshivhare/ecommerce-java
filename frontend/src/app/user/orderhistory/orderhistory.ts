import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  isLoading: boolean = true;
  selectedOrder: any = null;
  isCancelling: boolean = false;
  message: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    this.username = user?.name || user?.username || 'User';
    this.loadOrders();
  }

  loadOrders() {
    const user = JSON.parse(localStorage.getItem("user") || '{}');

    this.isLoading = true;
    this.cdr.detectChanges(); 

    this.http.get<any[]>(`http://localhost:8080/order/user/${user.id}`)
      .subscribe({
        next: (res) => {
          this.orders = (res || []).map(order => ({
            ...order,
            items: order.items || [],
            totalAmount: order.totalAmount || order.total || 0,
            status: (order.status || '').toUpperCase()
          }));

          this.isLoading = false;
          this.cdr.detectChanges(); 
        },
        error: (err) => {
          console.error(err);
          this.orders = [];
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }

  openCancelModal(order: any) {
    this.selectedOrder = order;
    this.cdr.detectChanges();
  }

  closeModal() {
    this.selectedOrder = null;
    this.cdr.detectChanges();
  }

  confirmCancel() {

  if (!this.selectedOrder || !this.selectedOrder.id) {
    this.message = 'Invalid order selected';
    return;
  }

  if (this.selectedOrder.status === 'CANCELLED') {
    this.message = 'Order already cancelled';
    return;
  }

  const orderId = Number(this.selectedOrder.id);

  this.isCancelling = true;
  this.cdr.detectChanges();

  this.http.put(
    `http://localhost:8080/order/cancel/${orderId}`,
    {},
    { responseType: 'text' }   
  ).subscribe({
    next: (res: any) => {
      this.message = res || 'Order cancelled successfully';
      this.isCancelling = false;
      this.closeModal();
      this.loadOrders();
    },
    error: (err) => {
      console.error(err);
      this.message = err?.error || 'Failed to cancel order';
      this.isCancelling = false;
      this.closeModal();
      this.cdr.detectChanges();
    }
  });
}

  onImageError(event: any) {
    event.target.src = 'assets/no-image.png';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  goBack() {
    this.router.navigate(['/catalog']);
  }

  goToCatalog() {
    this.router.navigate(['/catalog']);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }
}