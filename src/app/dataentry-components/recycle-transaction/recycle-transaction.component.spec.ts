import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecycleTransactionComponent } from './recycle-transaction.component';

describe('RecycleTransactionComponent', () => {
  let component: RecycleTransactionComponent;
  let fixture: ComponentFixture<RecycleTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecycleTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecycleTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
