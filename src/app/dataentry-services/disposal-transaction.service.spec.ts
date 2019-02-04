import { TestBed } from '@angular/core/testing';

import { DisposalTransactionService } from './disposal-transaction.service';

describe('DisposalTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisposalTransactionService = TestBed.get(DisposalTransactionService);
    expect(service).toBeTruthy();
  });
});
