import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { ProductService } from '../../services/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-catalog.html',
  styleUrl: './product-catalog.css',
})
export class ProductCatalogComponent implements OnInit {

  products: any[] = [];
  allProducts: any[] = [];
  displayedProducts: any[] = [];

  cartCount: number = 0;
  searchText: string = '';
  searchType: string = 'name';

  username: string = 'User';
  showDropdown: boolean = false;

  pageSize = 50;
  currentIndex = 0;

  constructor(
    private service: ProductService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadUser();
    this.loadCartCount();
  }

  
  loadUser() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.username =
      `${user.firstName || ''} ${user.lastName || ''}`.trim()
      || user.username
      || 'User';
  }

  
  loadProducts() {
  this.service.getAll().subscribe({
    next: (res) => {
      this.allProducts = res || [];
      this.resetScroll();

      this.cdr.detectChanges();
    },
    error: () => {
      this.allProducts = [];
      this.cdr.detectChanges(); 
    }
  });
}

  resetScroll() {
    this.displayedProducts = [];
    this.currentIndex = 0;
    this.loadMore();
  }

  loadMore() {
    const next = this.allProducts.slice(
      this.currentIndex,
      this.currentIndex + this.pageSize
    );

    this.displayedProducts = [...this.displayedProducts, ...next];
    this.currentIndex += this.pageSize;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.loadMore();
    }
  }

search() {

  const text = this.searchText.toLowerCase().trim();

  if (!text && !this.searchType) {
    this.resetScroll();
    return;
  }

  this.displayedProducts = this.allProducts.filter(p => {

    const matchesText =
      !text || p.name?.toLowerCase().includes(text);

    const matchesCategory =
      !this.searchType || p.category === this.searchType;

    return matchesText && matchesCategory;
  });
}
  
  loadCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  this.cartCount = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
}

  addToCart(product: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartCount = cart.length;
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
viewProduct(product: any) {
  this.router.navigate(['/product', product.id]);
}
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}