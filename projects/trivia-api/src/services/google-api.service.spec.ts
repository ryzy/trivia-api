import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/common';
import { makePagedResult } from 'ngx-trivia-api';
import { marbles } from 'rxjs-marbles';
import { of, throwError } from 'rxjs';

import { GoogleApiService, googleResultToExplanation, googleResultToImage } from './google-api.service';
import { mockExplanation1, mockExplanations, mockGoogleKnowledgeResponse } from '../../../../test/fixtures/explanation';
import { Explanation } from '../../../ngx-trivia-api/src/lib/model/explanation';
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

  test('#googleResultToExplanation', () => {
    expect(googleResultToExplanation()).toMatchSnapshot();
    expect(googleResultToExplanation(mockGoogleKnowledgeResponse.itemListElement[0])).toEqual(mockExplanation1);
  });

  describe('getImages', () => {
    it(
      'should get images',
      marbles((m) => {
        jest.spyOn(http, 'get').mockReturnValue(of({ data: { items: [mockGoogleImageRes] } }));
        m.expect(service.getImages({ q: 'some query' })).toBeObservable('(v|)', {
          v: makePagedResult([mockImage3], 0, 1),
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

  describe('getExplanations', () => {
    let res: Explanation[] | undefined;

    it('should get explanations', () => {
      jest.spyOn(http, 'get').mockReturnValue(of({ data: mockGoogleKnowledgeResponse }));
      service.getExplanations({}).subscribe((v) => (res = v));
      expect(res).toEqual(mockExplanations);
    });

    it('should get explanation - empty response', () => {
      jest.spyOn(http, 'get').mockReturnValue(of({ data: {} }));
      service.getExplanations({}).subscribe((v) => (res = v));
      expect(res).toEqual([]);
    });
  });
});
