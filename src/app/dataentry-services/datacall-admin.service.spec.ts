import { TestBed } from '@angular/core/testing';

import { DataCallAdminService } from './datacall-admin.service';

describe('UserAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataCallAdminService = TestBed.get(DataCallAdminService);
    expect(service).toBeTruthy();
  });
});
