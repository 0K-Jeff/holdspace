import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationIdboxComponent } from './installation-idbox.component';

describe('InstallationIdboxComponent', () => {
  let component: InstallationIdboxComponent;
  let fixture: ComponentFixture<InstallationIdboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationIdboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationIdboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
