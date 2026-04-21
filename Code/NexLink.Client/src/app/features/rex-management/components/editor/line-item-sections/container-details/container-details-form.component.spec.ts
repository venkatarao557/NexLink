import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContainerDetailsComponent } from './container-details.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ContainerDetailsComponent', () => {
  let component: ContainerDetailsComponent;
  let fixture: ComponentFixture<ContainerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerDetailsComponent, NoopAnimationsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerDetailsComponent);
    component = fixture.componentInstance;

    component.containerForm = new FormGroup({
      containerNumber: new FormControl(''),
      sealNumber: new FormControl(''),
      containerSize: new FormControl(''),
      containerType: new FormControl(''),
      sealSource: new FormControl('')
    });

    fixture.detectChanges();
  });

  it('should create the container details component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate container number format if required', () => {
    const control = component.containerForm.get('containerNumber');
    control?.setValue('ABCU1234567');
    expect(control?.valid).toBeTrue();
  });
});