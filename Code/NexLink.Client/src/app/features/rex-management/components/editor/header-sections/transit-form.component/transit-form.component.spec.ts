import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransitFormComponent } from './transit-form.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TransitFormComponent', () => {
  let component: TransitFormComponent;
  let fixture: ComponentFixture<TransitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransitFormComponent, NoopAnimationsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TransitFormComponent);
    component = fixture.componentInstance;

    component.transitForm = new FormGroup({
      transitType: new FormControl(''),
      transitPersonName: new FormControl(''),
      transitAddress: new FormControl(''),
      transitPort: new FormControl(''),
      approvalNbr: new FormControl('')
    });

    fixture.detectChanges();
  });

  it('should create the transit form component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a transitType control', () => {
    expect(component.transitForm.contains('transitType')).toBeTrue();
  });
});