import { TestBed } from '@angular/core/testing';
import { NgxTriviaApiTestingModule } from '../../testing/ngx-trivia-api-testing.module';

import { TriviaApiService } from './trivia-api.service';

describe('TriviaApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxTriviaApiTestingModule],
    });
  });

  it('should be created', () => {
    const service: TriviaApiService = TestBed.get(TriviaApiService);
    expect(service).toBeTruthy();
  });
});
