import { TestBed } from '@angular/core/testing';

import { RESTClient } from './json-client.service';

describe('RESTClient', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RESTClient = TestBed.get(RESTClient);
    expect(service).toBeTruthy();
  });
});
