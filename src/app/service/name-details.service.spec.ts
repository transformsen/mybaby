import { TestBed } from '@angular/core/testing';

import { NameDetailsService } from './name-details.service';

describe('NameDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NameDetailsService = TestBed.get(NameDetailsService);
    expect(service).toBeTruthy();
  });
});
