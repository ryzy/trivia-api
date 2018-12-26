import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/common';
import { marbles } from 'rxjs-marbles';
import { of, throwError } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';

import { ImageService } from './image.service';
import { mockUnsplashImage } from '../../test/fixtures/unsplash-image';
import { mockImage1 } from '../../test/fixtures/image';

const mockHttpError: AxiosError = {
  name: 'Error',
  message: 'Some Error',
  config: {},
  response: {
    data: {
      errors: ['Some error', 'Some another error'],
    },
  } as AxiosResponse,
};

describe('ImageService', () => {
  let app: TestingModule;
  let http: HttpService;
  let service: ImageService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ImageService],
    }).compile();

    http = app.get<HttpService>(HttpService);
    service = app.get<ImageService>(ImageService);
  });

  describe('getImage', () => {
    it(
      'should get image',
      marbles(m => {
        jest
          .spyOn(http, 'get')
          .mockReturnValue(of({ data: mockUnsplashImage }));
        m.expect(service.getImage()).toBeObservable('(v|)', { v: mockImage1 });
      }),
    );

    it(
      'should catch error',
      marbles(m => {
        jest.spyOn(http, 'get').mockReturnValue(throwError(mockHttpError));
        m.expect(service.getImage()).toBeObservable('#', undefined, {
          name: 'Error',
          message: {
            errors: mockHttpError.response!.data.errors,
            status: 500,
          },
        });
      }),
    );
  });

  describe('getImages', () => {
    it(
      'should get images',
      marbles(m => {
        const images = [mockImage1];
        jest
          .spyOn(http, 'get')
          .mockReturnValue(of({ data: [mockUnsplashImage] }));
        m.expect(service.getImages()).toBeObservable('(v|)', {
          v: [mockImage1],
        });
      }),
    );
  });
});
