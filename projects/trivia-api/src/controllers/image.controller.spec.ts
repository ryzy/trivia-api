import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { makePagedResult } from 'ngx-trivia-api';
import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles';

import { GoogleApiService } from '../services/google-api.service';
import { UnsplashApiService } from '../services/unsplash-api.service';
import { ImageController } from './image.controller';
import { mockImage1, mockImage2, mockImage3 } from '../../../../test/fixtures/image';

describe('ImageController', () => {
  let app: TestingModule;
  let controller: ImageController;
  let unsplashApi: UnsplashApiService;
  let googleApi: GoogleApiService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ImageController],
      providers: [UnsplashApiService, GoogleApiService],
    }).compile();

    controller = app.get<ImageController>(ImageController);
    unsplashApi = app.get<UnsplashApiService>(UnsplashApiService);
    googleApi = app.get<GoogleApiService>(GoogleApiService);
  });

  describe('getUnsplashImages', () => {
    it(
      'should get latest images when no query params',
      marbles((m) => {
        const images = [mockImage1, mockImage2];
        jest.spyOn(unsplashApi, 'getImages').mockReturnValue(of(makePagedResult(images)));
        m.expect(controller.getUnsplashImages({})).toBeObservable('(v|)', { v: makePagedResult(images) });
      }),
    );

    it(
      'should search images',
      marbles((m) => {
        const images = [mockImage1, mockImage2];
        jest.spyOn(unsplashApi, 'getImages').mockReturnValue(of(makePagedResult(images)));
        m.expect(controller.getUnsplashImages({ q: 'foo' })).toBeObservable('(v|)', { v: makePagedResult(images) });
      }),
    );
  });

  describe('getGoogleImages', () => {
    it(
      'should search images',
      marbles((m) => {
        const images = [mockImage3];
        jest.spyOn(googleApi, 'getImages').mockReturnValue(of(makePagedResult(images)));
        m.expect(controller.getGoogleImages({ q: 'foo' })).toBeObservable('(v|)', { v: makePagedResult(images) });
      }),
    );
  });
});
