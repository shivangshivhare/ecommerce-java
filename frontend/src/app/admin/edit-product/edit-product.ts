import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.html',
  styleUrls: ['./edit-product.css'],
})
export class EditProductComponent implements OnInit {

  categories: string[] = [];   
  product: any = {};
  username = '';

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    
    this.loadCategories();

    
    this.service.getById(id).subscribe({
      next: (res) => {
        this.product = res;
        this.cdr.detectChanges();
      }
    });

    const user = localStorage.getItem('username');
    this.username = user || 'User';
  }

  
  loadCategories() {
    this.service.getCategories().subscribe({
      next: (res) => {
        this.categories = res || [];
        this.cdr.detectChanges();
      },
      error: () => {
        this.categories = [];
        this.cdr.detectChanges();
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin/products']);
  }

  update() {
    this.service.update(this.product).subscribe(() => {
      this.router.navigate(['/admin/products']);
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}