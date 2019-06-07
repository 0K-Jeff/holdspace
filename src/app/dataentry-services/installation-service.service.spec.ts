import { TestBed } from '@angular/core/testing';

import { InstallationServiceService } from './installation-service.service';

describe('InstallationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstallationServiceService = TestBed.get(InstallationServiceService);
    expect(service).toBeTruthy();
  });
});
