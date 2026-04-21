import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsigneeFormComponent } from './consignee-form.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ConsigneeFormComponent', () => {
  let component: ConsigneeFormComponent;
  let fixture: ComponentFixture<ConsigneeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsigneeFormComponent, NoopAnimationsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsigneeFormComponent);
    component = fixture.componentInstance;

    component.consigneeForm = new FormGroup({
      consigneeName: new FormControl(''),
      repName: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl(''),
      city: new FormControl(''),
      countryCode: new FormControl('')
    });

    fixture.detectChanges();
  });

  it('should create the consignee form', () => {
    expect(component).toBeTruthy();
  });

  it('should emit notifyPartyRequested when button is clicked', () => {
    spyOn(component.notifyPartyRequested, 'emit');
    component.onNotifyParty();
    expect(component.notifyPartyRequested.emit).toHaveBeenCalled();
  });
});