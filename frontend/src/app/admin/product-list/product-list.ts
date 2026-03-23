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

  categories: string[] = [];  
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

  dropdownOpen: boolean = false;

  constructor(
    private service: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();

    const user = localStorage.getItem('username');
    if (user) this.username = user;
  }

  // LOAD PRODUCTS
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

  // LOAD CATEGORIES FROM BACKEND
  loadCategories() {
    this.service.getCategories().subscribe({
      next: (res) => {
        this.categories = res || [];
        this.cdr.detectChanges();
      },
      error: () => {
        this.categories = [];
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

  // FIXED SEARCH
  search() {
    const text = this.searchText.toLowerCase();

    this.products = this.allProducts.filter(p => {

      const matchesText =
        !text ||
        p.name?.toLowerCase().includes(text) ||
        p.category?.toLowerCase().includes(text) ||
        p.description?.toLowerCase().includes(text);

      const matchesCategory =
        !this.searchCategory || p.category === this.searchCategory;

      return matchesText && matchesCategory;
    });

    this.page = 1;
  }

  // SORT
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

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}