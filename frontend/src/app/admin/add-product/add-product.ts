import { Component } from '@angular/core';
import { ProductService } from '../../services/product';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule,CommonModule],
  standalone: true,
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class  AddProductComponent {
  product: any = {};
  username: string = 'Admin';
  constructor(private service: ProductService, private router: Router) {}

 save() {
  this.service.save(this.product).subscribe(() => {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/products']);
    });
  });
}
logout() {
  localStorage.clear();
  this.router.navigate(['/login']);
}
}
