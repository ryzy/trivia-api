import { TestBed } from '@angular/core/testing';
import { NgxTriviaApiTestingModule } from '../../testing/ngx-trivia-api-testing.module';

import { TriviaDataService } from './trivia-data.service';

describe('TriviaDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxTriviaApiTestingModule],
    });
  });

  it('should be created', () => {
    const service: TriviaDataService = TestBed.get(TriviaDataService);
    expect(service).toBeTruthy();
  });
});
