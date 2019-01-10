import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles';

import { UnsplashApiService } from '../services/unsplash-api.service';
import { ImageController } from './image.controller';
import { mockImage1, mockImage2 } from '../../../../test/fixtures/image';

describe('ImageController', () => {
  let app: TestingModule;
  let controller: ImageController;
  let service: UnsplashApiService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ImageController],
      providers: [UnsplashApiService],
    }).compile();

    controller = app.get<ImageController>(ImageController);
    service = app.get<UnsplashApiService>(UnsplashApiService);
  });

  describe('getImages', () => {
    it(
      'should get latest images when no query params',
      marbles((m) => {
        const images = [mockImage1, mockImage2];
        jest.spyOn(service, 'getImages').mockReturnValue(of(images));
        m.expect(controller.getImages({})).toBeObservable('(v|)', { v: images });
      }),
    );

    it(
      'should search images',
      marbles((m) => {
        const images = [mockImage1, mockImage2];
        jest.spyOn(service, 'getImages').mockReturnValue(of(images));
        m.expect(controller.getImages({ q: 'foo' })).toBeObservable('(v|)', { v: images });
      }),
    );
  });
});
