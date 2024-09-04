import { TestBed } from '@angular/core/testing';

import { Phq9Service } from './phq9.service';

describe('Phq9Service', () => {
  let service: Phq9Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Phq9Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
