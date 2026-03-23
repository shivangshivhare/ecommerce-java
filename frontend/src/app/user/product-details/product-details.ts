import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.html',
})
export class ProductDetailComponent implements OnInit {

  product: any;
  quantity: number = 1;
  username: string = 'User';
  cartCount: number = 0;

  quantityOptions: number[] = [];
  isInCart: boolean = false;

  message: string = '';
  messageType: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUser();
    this.loadCartCount();

    const param = this.route.snapshot.paramMap.get('id');

    if (!param || isNaN(Number(param))) {
      this.router.navigate(['/']);
      return;
    }

    const id = Number(param);
    this.loadProduct(id);
  }

  loadUser() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.username =
      `${user.firstName || ''} ${user.lastName || ''}`.trim()
      || user.username
      || 'User';
  }

  loadCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartCount = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
  }

  loadProduct(id: number) {
    this.service.getById(id).subscribe({
      next: (res) => {
        this.product = res;

        const max = Math.min(this.product.quantity, 10);
        this.quantityOptions = [];

        for (let i = 1; i <= max; i++) {
          this.quantityOptions.push(i);
        }

        this.checkCart();
        this.cdr.detectChanges();
      },
      error: () => {
        this.showMessage("Product not found", "danger");
      }
    });
  }

  checkCart() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existing = cart.find((item: any) => item.id === this.product.id);

    if (existing) {
      this.isInCart = true;
      this.quantity = existing.quantity;
    }
  }

  addToCart() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existing = cart.find((item: any) => item.id === this.product.id);

    if (existing) {
      existing.quantity += this.quantity;
    } else {
      cart.push({
        ...this.product,
        quantity: this.quantity
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCartCount();
    this.isInCart = true;

    this.showMessage('Added to cart successfully', 'success');
  }

  updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const index = cart.findIndex((item: any) => item.id === this.product.id);

    if (index !== -1) {
      cart[index].quantity = this.quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      this.loadCartCount();

      this.showMessage('Cart updated', 'info');
    }
  }

  removeFromCart() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    cart = cart.filter((item: any) => item.id !== this.product.id);

    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCartCount();

    this.isInCart = false;

    this.showMessage('Removed from cart', 'danger');
  }

  showMessage(msg: string, type: string) {
    this.message = msg;
    this.messageType = type;

    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }
  buyNow() {
  let order = {
    productId: this.product.id,
    name: this.product.name,
    price: this.product.price,
    quantity: this.quantity,
    totalAmount: this.product.price * this.quantity,
    orderTime: new Date(),
    status: "CONFIRMED"
  };

  localStorage.setItem('order', JSON.stringify(order));


  setTimeout(() => {
    this.router.navigate(['/checkout']);
  }, 1000);
}
goToCatalog() {
  this.router.navigate(['/catalog']);
}
}