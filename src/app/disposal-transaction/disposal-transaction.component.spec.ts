import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalTransactionComponent } from './disposal-transaction.component';

describe('DisposalTransactionComponent', () => {
  let component: DisposalTransactionComponent;
  let fixture: ComponentFixture<DisposalTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisposalTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisposalTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
