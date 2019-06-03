import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationPickerComponent } from './installation-picker.component';

describe('InstallationPickerComponent', () => {
  let component: InstallationPickerComponent;
  let fixture: ComponentFixture<InstallationPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
