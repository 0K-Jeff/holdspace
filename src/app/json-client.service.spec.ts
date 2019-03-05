import { TestBed } from '@angular/core/testing';

import { JsonClientService } from './json-client.service';

describe('JsonClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonClientService = TestBed.get(JsonClientService);
    expect(service).toBeTruthy();
  });
});
