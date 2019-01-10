import { TestBed } from '@angular/core/testing';

import { TriviaDataService } from './trivia-data.service';

describe('TriviaDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TriviaDataService = TestBed.get(TriviaDataService);
    expect(service).toBeTruthy();
  });
});
