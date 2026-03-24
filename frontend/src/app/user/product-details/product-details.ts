import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart-service';
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

  
  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private cartService: CartService,   
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
    let user = JSON.parse(localStorage.getItem("user")!);

    if (!user?.id) return;

    this.cartService.getCart(user.id)
      .subscribe({
        next: (res) => {
          this.cartCount = res.length;
          this.cdr.detectChanges();
        },
        error: () => {
          this.cartCount = 0;
        }
      });
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
    let user = JSON.parse(localStorage.getItem("user")!);

    if (!user?.id) return;

    this.cartService.getCart(user.id).subscribe({
      next: (res) => {
        const existing = res.find((item: any) => item.productId === this.product.id);

        if (existing) {
          this.isInCart = true;
          this.quantity = existing.quantity;
        }
      }
    });
  }

  addToCart() {
    let user = JSON.parse(localStorage.getItem("user")!);

    let cartItem = {
      userId: user.id,
      productId: this.product.id,
      name: this.product.name,
      image: this.product.imageUrl,
      price: this.product.price,
      quantity: this.quantity
    };

    this.cartService.addToCart(cartItem).subscribe(() => {
      this.loadCartCount();
      this.isInCart = true;
      this.showMessage('Added to cart successfully', 'success');
    });
  }

  updateCart() {
    let user = JSON.parse(localStorage.getItem("user")!);

    this.cartService.getCart(user.id).subscribe(res => {

      let existing = res.find((item: any) => item.productId === this.product.id);

      if (existing) {
        this.cartService.updateQty(existing.id, this.quantity)
          .subscribe(() => {
            this.loadCartCount();
            this.showMessage('Cart updated', 'info');
          });
      }
    });
  }

  removeFromCart() {
    let user = JSON.parse(localStorage.getItem("user")!);

    this.cartService.getCart(user.id).subscribe(res => {

      let existing = res.find((item: any) => item.productId === this.product.id);

      if (existing) {
        this.cartService.deleteItem(existing.id).subscribe(() => {
          this.loadCartCount();
          this.isInCart = false;
          this.showMessage('Removed from cart', 'danger');
        });
      }
    });
  }

  buyNow() {
    let user = JSON.parse(localStorage.getItem("user")!);

    let cartItem = {
      userId: user.id,
      productId: this.product.id,
      name: this.product.name,
      image: this.product.imageUrl,
      price: this.product.price,
      quantity: this.quantity
    };

    this.cartService.addToCart(cartItem).subscribe(() => {
      this.loadCartCount();
      this.router.navigate(['/checkout']);
    });
  }

  
  searchProduct() {
    if (!this.searchTerm || this.searchTerm.trim() === '') return;

    localStorage.setItem('searchText', this.searchTerm);
    this.router.navigate(['/catalog']);
  }

  showMessage(msg: string, type: string) {
    this.message = msg;
    this.messageType = type;

    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  goToCart() { this.router.navigate(['/cart']); }
  goToOrders() { this.router.navigate(['/orders']); }
  goToCatalog() { this.router.navigate(['/catalog']); }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}