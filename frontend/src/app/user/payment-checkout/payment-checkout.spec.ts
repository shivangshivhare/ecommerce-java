import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentCheckoutComponent } from './payment-checkout';
import { provideHttpClientTesting } from '@angular/common/http/testing';

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

  afterEach(() => {
    localStorage.clear(); 
  });

  it('should create payment component', () => {
    expect(component).toBeTruthy();
  });

});