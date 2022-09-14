import { TestBed } from '@angular/core/testing';

import { GuserService } from './guser.service';

describe('GuserService', () => {
  let service: GuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
