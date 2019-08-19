import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolePickerComponent } from './user-role-picker.component';

describe('UserRolePickerComponent', () => {
  let component: UserRolePickerComponent;
  let fixture: ComponentFixture<UserRolePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRolePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRolePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
