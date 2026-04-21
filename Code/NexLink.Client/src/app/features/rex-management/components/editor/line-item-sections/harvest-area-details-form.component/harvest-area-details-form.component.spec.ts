import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarvestAreaDetailsComponent } from './harvest-area-details.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';

describe('HarvestAreaDetailsComponent', () => {
  let component: HarvestAreaDetailsComponent;
  let fixture: ComponentFixture<HarvestAreaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HarvestAreaDetailsComponent,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatNativeDateModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HarvestAreaDetailsComponent);
    component = fixture.componentInstance;

    component.harvestForm = new FormGroup({
      harvestAreaName: new FormControl(''),
      harvestAreaId: new FormControl(''),
      waterType: new FormControl(''),
      leaseNumber: new FormControl(''),
      harvestStartDate: new FormControl(null),
      harvestEndDate: new FormControl(null)
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});