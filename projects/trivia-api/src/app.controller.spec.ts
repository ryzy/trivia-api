import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles';

import { AppController } from './app.controller';
import { ImageService } from './services/image.service';
import { mockImage1, mockImage2 } from '../../../test/fixtures/image';

describe('AppController', () => {
  let app: TestingModule;
  let controller: AppController;
  let service: ImageService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [ImageService],
    }).compile();

    controller = app.get<AppController>(AppController);
    service = app.get<ImageService>(ImageService);
  });

  describe('getImage', () => {
    it(
      'should get image',
      marbles((m) => {
        jest.spyOn(service, 'getImage').mockReturnValue(of(mockImage1));
        m.expect(controller.getImage({})).toBeObservable('(v|)', {
          v: mockImage1,
        });
      }),
    );
  });

  describe('getImages', () => {
    it(
      'should get images',
      marbles((m) => {
        const images = [mockImage1, mockImage2];
        jest.spyOn(service, 'getImages').mockReturnValue(of(images));
        m.expect(controller.getImages()).toBeObservable('(v|)', { v: images });
      }),
    );
  });

  describe('searchImages', () => {
    it(
      'should search images',
      marbles((m) => {
        const images = [mockImage1, mockImage2];
        jest.spyOn(service, 'getImages').mockReturnValue(of(images));
        m.expect(controller.searchImages({ query: 'foo' })).toBeObservable('(v|)', { v: images });
      }),
    );
  });
});
