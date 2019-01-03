import { TestBed } from '@angular/core/testing';

import { NgxImageApiService } from './ngx-image-api.service';

describe('NgxImageApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxImageApiService = TestBed.get(NgxImageApiService);
    expect(service).toBeTruthy();
  });
});
