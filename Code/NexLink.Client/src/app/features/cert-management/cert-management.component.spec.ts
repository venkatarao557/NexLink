import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertManagement } from './cert-management.component';

describe('CertManagement', () => {
  let component: CertManagement;
  let fixture: ComponentFixture<CertManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(CertManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
