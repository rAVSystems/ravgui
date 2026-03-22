import { TestBed } from '@angular/core/testing';

import { Qsys } from './qsys';

describe('Qsys', () => {
  let service: Qsys;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Qsys);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
