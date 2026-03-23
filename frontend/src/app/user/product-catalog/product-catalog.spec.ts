import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCatalogComponent } from './product-catalog';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProductCatalogComponent', () => {

  let component: ProductCatalogComponent;
  let fixture: ComponentFixture<ProductCatalogComponent>;

  beforeEach(() => {

    // ✅ Mock user for localStorage (fix null id error)
    localStorage.setItem('user', JSON.stringify({ id: 1 }));

    TestBed.configureTestingModule({
      imports: [ProductCatalogComponent],
      providers: [provideHttpClientTesting()] // ✅ prevent real API calls
    });

    fixture = TestBed.createComponent(ProductCatalogComponent);
    component = fixture.componentInstance;
  });

  it('should create product catalog component', () => {
    expect(component).toBeTruthy();
  });

});