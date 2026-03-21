import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import{ ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css',
})
export class EditProductComponent implements OnInit {
 categories: string[] = ['Kitchen', 'Skincare', 'Electronics', 'Clothing'];
  product: any = {};
  username: string = 'Shivang Shivhare';
  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.service.getById(id).subscribe(res => {
      this.product = res;
      this.cdr.detectChanges();
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
