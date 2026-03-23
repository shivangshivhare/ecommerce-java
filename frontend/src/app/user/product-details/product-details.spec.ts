import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './product-details';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProductDetailComponent', () => {

  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute, 
          useValue: {
            snapshot: { paramMap: { get: () => '1' } }
          }
        }
      ]
    });

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create product details component', () => {
    expect(component).toBeTruthy();
  });

});