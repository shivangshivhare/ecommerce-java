import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CartComponent', () => {

  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(() => {

    localStorage.setItem('user', JSON.stringify({ id: 1 }));

    TestBed.configureTestingModule({   
      imports: [CartComponent],
      providers: [provideHttpClientTesting()]
    });

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;

    fixture.detectChanges(); 
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create cart component', () => {
    expect(component).toBeTruthy();
  });

});