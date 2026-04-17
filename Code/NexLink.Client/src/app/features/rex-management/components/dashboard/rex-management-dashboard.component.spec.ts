import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RexManagement } from './rex-management-dashboard.component';

describe('RexManagement', () => {
  let component: RexManagement;
  let fixture: ComponentFixture<RexManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RexManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(RexManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
