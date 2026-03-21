import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductListComponent implements OnInit {
  categories: string[] = ['Kitchen', 'Skincare', 'Electronics','Book'];
  products: any[] = [];
  allProducts: any[] = [];

  searchText: string = '';
  searchCategory: string = '';

  sortField: string = '';
  sortDirection: string = 'asc';

  username: string = 'shivang raj shivhare';

  page = 1;
  pageSize = 5;

  confirmDeleteId: number | null = null;

  constructor(
    private service: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef
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
        this.allProducts = [];
      }
    });
  }

  add() {
    this.router.navigate(['/admin/add-product']);
  }

  edit(id: number) {
    this.router.navigate(['/admin/edit-product', id]);
  }

  askDelete(id: number) {
    this.confirmDeleteId = id;
  }

  cancelDelete() {
    this.confirmDeleteId = null;
  }

  confirmDelete(id: number) {
    this.service.delete(id).subscribe(() => {
      this.loadProducts();
      this.confirmDeleteId = null;
    });
  }


  search() {
    if (!this.searchText) {
      this.products = [...this.allProducts];
      this.page = 1;
      return;
    }

    const text = this.searchText.toLowerCase();

    this.products = this.allProducts.filter(p => {

      if (this.searchCategory === 'category') {
        return p.category?.toLowerCase().includes(text);
      }

      if (this.searchCategory === 'description') {
        return p.description?.toLowerCase().includes(text);
      }

      if (this.searchCategory === 'price') {
        return p.price?.toString().includes(text);
      }

      return (
        p.category?.toLowerCase().includes(text) ||
        p.description?.toLowerCase().includes(text) ||
        p.price?.toString().includes(text)
      );
    });

    this.page = 1;
  }

  sort(field: string) {

    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.products.sort((a, b) => {

      let valA = a[field] ?? 0;
      let valB = b[field] ?? 0;

      if (this.sortDirection === 'asc') {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }

    });

    this.page = 1;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  get paginatedProducts() {
    const start = (this.page - 1) * this.pageSize;
    return this.products.slice(start, start + this.pageSize);
  }
dropdownOpen: boolean = false;

toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}

}