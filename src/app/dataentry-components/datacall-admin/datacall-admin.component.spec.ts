import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCallAdminComponent } from './datacall-admin.component';

describe('DatacallAdminComponent', () => {
  let component: DataCallAdminComponent;
  let fixture: ComponentFixture<DataCallAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCallAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCallAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
