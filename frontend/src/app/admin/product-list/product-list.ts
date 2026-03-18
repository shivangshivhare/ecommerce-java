import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../interface/product';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductListComponent implements OnInit {

  products: any[] = [];

  searchText: string = '';

  username: string = 'Admin';

  constructor(
    private service: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProducts();
    const user = localStorage.getItem('username');
    if (user) {
      this.username = user;
    }
  }

  loadProducts() {
    this.service.getAll().subscribe({
      next: (res) => {
        console.log("DATA:", res);
        this.products = res || [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.products = [];
      }
    });
  }

  delete(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (err) => console.error(err)
    });
  }

  edit(id: number) {
    this.router.navigate(['/admin/edit-product', id]);
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  add() {
    this.router.navigate(['/admin/add-product']);
  }

  search() {
    if (!this.searchText) {
      this.loadProducts();
      return;
    }

    const text = this.searchText.toLowerCase();

    this.products = this.products.filter(p =>
      (p.name && p.name.toLowerCase().includes(text)) ||
      (p.description && p.description.toLowerCase().includes(text)) ||
      (p.price && p.price.toString().includes(text))
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}