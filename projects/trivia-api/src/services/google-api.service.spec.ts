import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/common';
import { marbles } from 'rxjs-marbles';
import { of, throwError } from 'rxjs';

import { GoogleApiService, googleResultToImage } from './google-api.service';
import { mockGoogleImageRes } from '../../../../test/fixtures/google-image';
import { mockImage3 } from '../../../../test/fixtures/image';

describe('GoogleApiService', () => {
  let app: TestingModule;
  let http: HttpService;
  let service: GoogleApiService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [GoogleApiService],
    }).compile();

    http = app.get<HttpService>(HttpService);
    service = app.get<GoogleApiService>(GoogleApiService);
  });

  test('#googleResultToImage', () => {
    expect(googleResultToImage(undefined as any, 1)).toMatchSnapshot();
    expect(googleResultToImage(mockGoogleImageRes, 0)).toEqual(mockImage3);
  });

  describe('getImages', () => {
    it(
      'should get images',
      marbles((m) => {
        jest.spyOn(http, 'get').mockReturnValue(of({ data: { items: [mockGoogleImageRes] } }));
        m.expect(service.getImages({ q: 'some query' })).toBeObservable('(v|)', {
          v: [mockImage3],
        });
      }),
    );

    it(
      'should should throw error when no query',
      marbles((m) => {
        const err = new Error('missing query');
        jest.spyOn(http, 'get').mockReturnValue(throwError(err));
        m.expect(service.getImages({})).toBeObservable('#', undefined, {
          name: 'Error',
          message: {
            errors: ['Internal Server Error'],
            status: 500,
          },
        });
      }),
    );
  });
});
