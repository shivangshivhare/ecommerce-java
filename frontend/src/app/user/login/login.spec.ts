import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Logincomponent } from './login';

describe('Logincomponent', () => {

  let component: Logincomponent;
  let fixture: ComponentFixture<Logincomponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Logincomponent]
    });

    fixture = TestBed.createComponent(Logincomponent);
    component = fixture.componentInstance;
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize fields empty', () => {
    expect(component.email).toBe('');
    expect(component.password).toBe('');
  });

});