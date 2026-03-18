import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../services/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-catalog',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './product-catalog.html',
  styleUrl: './product-catalog.css',
})
export class ProductCatalogComponent implements OnInit {

  products: any[] = [];
  allProducts: any[] = [];

  cartCount: number = 0;
  searchText: string = '';
  username: string = 'User';

  constructor(
    private service: ProductService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();

    const user = localStorage.getItem('username');
    if (user) this.username = user;
  }

  loadProducts() {
    this.service.getAll().subscribe({
      next: (res) => {
        this.products = res || [];
        this.allProducts = [...this.products];
        this.cdr.detectChanges();
      },
      error: () => {
        this.products = [];
      }
    });
  }

  search() {
    if (!this.searchText.trim()) {
      this.products = [...this.allProducts];
      return;
    }

    const text = this.searchText.toLowerCase();

    this.products = this.allProducts.filter(p =>
      (p.name && p.name.toLowerCase().includes(text)) ||
      (p.category && p.category.toLowerCase().includes(text)) ||
      (p.price && p.price.toString().includes(text))
    );
  }

  addToCart(product: any) {
    this.cartCount++;
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}