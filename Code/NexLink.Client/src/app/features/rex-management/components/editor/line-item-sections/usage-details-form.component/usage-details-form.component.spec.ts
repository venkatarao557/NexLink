import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsageDetailsComponent } from './usage-details.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UsageDetailsComponent', () => {
  let component: UsageDetailsComponent;
  let fixture: ComponentFixture<UsageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsageDetailsComponent, NoopAnimationsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UsageDetailsComponent);
    component = fixture.componentInstance;

    component.usageForm = new FormGroup({
      productUse: new FormControl(''),
      intendedUse: new FormControl(''),
      stateOfOrigin: new FormControl(''),
      stateOfDestination: new FormControl('')
    });

    fixture.detectChanges();
  });

  it('should create the usage details component', () => {
    expect(component).toBeTruthy();
  });
});