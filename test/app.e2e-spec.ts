import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../projects/trivia-api/src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('GET /', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404);
  });

  test('GET /image', () => {
    return request(app.getHttpServer())
      .get('/image')
      .expect(404);
  });

  test('GET /image/:id', () => {
    return request(app.getHttpServer())
      .get('/image/7xfXMt_uRAw')
      .expect(200)
      .expect(/7xfXMt_uRAw/)
      .expect(/Carlos Augusto/);
  });

  test('GET /image/:id (ERROR)', () => {
    return request(app.getHttpServer())
      .get('/image/non-existing-invalid-photo-id')
      .expect(500)
      .expect(/Couldn't find Photo/);
  });

  test('GET /images should get list of recent images', () => {
    return request(app.getHttpServer())
      .get('/images')
      .expect(200)
      .expect(/"id":/); // expect some images with "id" field
  });

  test('GET /images/:query should search for images', () => {
    return request(app.getHttpServer())
      .get('/images/beauty')
      .expect(200)
      .expect(/"id":/); // expect some images with "id" field
  });

  test('GET /images/:query should return empty list of images', () => {
    return request(app.getHttpServer())
      .get('/images/someinvalidquerynosuchimage')
      .expect(200)
      .expect([]);
  });
});
