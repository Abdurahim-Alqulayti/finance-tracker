import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransctionDetailsPage } from './transaction-details.page';

describe('TransctionDetailsPage', () => {
  let component: TransctionDetailsPage;
  let fixture: ComponentFixture<TransctionDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransctionDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
