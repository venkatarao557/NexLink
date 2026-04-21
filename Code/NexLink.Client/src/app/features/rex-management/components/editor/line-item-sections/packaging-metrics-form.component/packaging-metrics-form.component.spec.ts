import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PackagingMetricsComponent } from './packaging-metrics.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PackagingMetricsComponent', () => {
  let component: PackagingMetricsComponent;
  let fixture: ComponentFixture<PackagingMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagingMetricsComponent, NoopAnimationsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PackagingMetricsComponent);
    component = fixture.componentInstance;
    
    // Mock the input form
    component.metricsForm = new FormGroup({
      numPackages: new FormControl(0),
      packageType: new FormControl(''),
      netWeight: new FormControl(0),
      grossWeight: new FormControl(0),
      shippingMarks: new FormControl('')
    });
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});