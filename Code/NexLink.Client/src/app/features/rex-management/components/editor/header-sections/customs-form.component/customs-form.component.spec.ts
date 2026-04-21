import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomsFormComponent } from './customs-form.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CustomsFormComponent', () => {
  let component: CustomsFormComponent;
  let fixture: ComponentFixture<CustomsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomsFormComponent, NoopAnimationsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomsFormComponent);
    component = fixture.componentInstance;

    component.customsForm = new FormGroup({
      customsAgentInd: new FormControl(false),
      totalFobAmount: new FormControl(null),
      invoiceCurrency: new FormControl(''),
      embargoMsg: new FormControl('')
    });

    fixture.detectChanges();
  });

  it('should create the customs form', () => {
    expect(component).toBeTruthy();
  });
});