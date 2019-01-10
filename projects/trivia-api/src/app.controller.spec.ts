import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';

import { AppController } from './app.controller';

describe('AppController', () => {
  let app: TestingModule;
  let controller: AppController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
    }).compile();

    controller = app.get<AppController>(AppController);
  });

  it('should work', () => {
    expect(controller).toBeDefined();
  });
});
