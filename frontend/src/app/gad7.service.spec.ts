import { TestBed } from '@angular/core/testing';

import { Gad7Service } from './gad7.service';

describe('Gad7Service', () => {
  let service: Gad7Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gad7Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
