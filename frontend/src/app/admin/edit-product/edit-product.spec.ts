import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProductComponent } from './edit-product';
import { PaymentCheckoutComponent } from '../../user/payment-checkout/payment-checkout';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';


describe('EditProductComponent', () => {

  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditProductComponent],
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

    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
  });

  it('should create edit product component', () => {
    expect(component).toBeTruthy();
  });

});


describe('PaymentCheckoutComponent', () => {

  let component: PaymentCheckoutComponent;
  let fixture: ComponentFixture<PaymentCheckoutComponent>;

  beforeEach(() => {

    
    localStorage.setItem('user', JSON.stringify({ id: 1 }));

    TestBed.configureTestingModule({
      imports: [PaymentCheckoutComponent],
      providers: [provideHttpClientTesting()]
    });

    fixture = TestBed.createComponent(PaymentCheckoutComponent);
    component = fixture.componentInstance;
  });

  it('should create payment component', () => {
    expect(component).toBeTruthy();
  });

});