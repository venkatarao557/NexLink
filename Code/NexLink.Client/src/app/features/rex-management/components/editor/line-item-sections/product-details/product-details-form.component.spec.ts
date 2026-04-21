import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsComponent } from './product-details.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent, NoopAnimationsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;

    component.productForm = new FormGroup({
      commodityCode: new FormControl(''),
      productCode: new FormControl(''),
      cutCode: new FormControl(''),
      productDescription: new FormControl(''),
      refrigerationType: new FormControl(''),
      packagingType: new FormControl('')
    });

    fixture.detectChanges();
  });

  it('should create the product details component', () => {
    expect(component).toBeTruthy();
  });
});