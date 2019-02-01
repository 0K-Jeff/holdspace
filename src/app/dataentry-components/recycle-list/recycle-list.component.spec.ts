import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecycleListComponent } from './recycle-list.component';

describe('RecycleListComponent', () => {
  let component: RecycleListComponent;
  let fixture: ComponentFixture<RecycleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecycleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecycleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
