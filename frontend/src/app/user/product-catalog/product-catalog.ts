import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart-service';
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
  categories: string[] = [];
  allProducts: any[] = [];
  displayedProducts: any[] = [];

  cartCount: number = 0;
  searchText: string = '';
  searchType: string = '';
  username: string = 'User';
  showDropdown: boolean = false;
  pageSize = 50;
  currentIndex = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadUser();
    this.loadCartCount();
    this.loadCategories();
  }
loadCategories() {
  this.productService.getCategories().subscribe({
    next: (res) => {
      this.categories = res || [];
      this.cdr.detectChanges();
    },
    error: () => {
      this.categories = [];
    }
  });
}
  loadUser() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username =
      `${user.firstName || ''} ${user.lastName || ''}`.trim()
      || user.username
      || 'User';
  }

  

  loadProducts() {
    this.productService.getAll().subscribe((res: any[]) => {
      this.allProducts = res || [];
      this.resetScroll();
      this.cdr.detectChanges();
    });
  }

  resetScroll() {
    this.displayedProducts = [];
    this.currentIndex = 0;
    this.loadMore();
  }

  loadMore() {
    const next = this.allProducts.slice(this.currentIndex, this.currentIndex + this.pageSize);
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

    this.displayedProducts = this.allProducts.filter(p =>
      (!text || p.name?.toLowerCase().includes(text)) &&
      (!this.searchType || p.category === this.searchType)
    );
  }

  

  loadCartCount() {
    let user = JSON.parse(localStorage.getItem("user")!);

    this.cartService.getCart(user.id)
      .subscribe(res => this.cartCount = res.length);
  }

  addToCart(product: any) {

    let user = JSON.parse(localStorage.getItem("user")!);

    this.cartService.getCart(user.id).subscribe(res => {

      let existing = res.find(i => i.productId === product.id);

      if (existing) {

        this.cartService.updateQty(existing.id, existing.quantity + 1)
          .subscribe(() => {
            this.loadCartCount();
            this.router.navigate(['/cart']);
          });

      } else {

        let cartItem = {
          userId: user.id,
          productId: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: 1
        };

        this.cartService.addToCart(cartItem)
          .subscribe(() => {
            this.loadCartCount();
            this.router.navigate(['/cart']);
          });
      }
    });
  }

  

  goToCart() { this.router.navigate(['/cart']); }
  goToOrders() { this.router.navigate(['/orders']); }
  goToProfile() { this.router.navigate(['/profile']); }

  viewProduct(p: any) {
    this.router.navigate(['/product', p.id]);
  }
goToCatalog() {
  this.router.navigate(['/catalog']);
}
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}