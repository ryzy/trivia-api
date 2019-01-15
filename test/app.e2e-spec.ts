import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../projects/trivia-api/src/app.module';

describe('Trivia API - E2E', () => {
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

  test('GET Unsplash images: latest', () => {
    return request(app.getHttpServer())
      .get('/unsplash/images')
      .expect(200)
      .expect(/"id":/); // expect some images with "id" field
  });

  test('GET Unsplash images: query', () => {
    return request(app.getHttpServer())
      .get('/unsplash/images?q=beauty')
      .expect(200)
      .expect(/"id":/); // expect some images with "id" field
  });

  test('GET Unsplash images: empty list of images', () => {
    return request(app.getHttpServer())
      .get('/unsplash/images?q=someinvalidquerynosuchimage')
      .expect(200)
      .expect({
        pageInfo: {
          totalCount: 0,
          page: 1,
          pageSize: 10,
        },
        items: []
      });
  });

  test('GET Google images: query', () => {
    return request(app.getHttpServer())
      .get('/google/images?q=beauty')
      .expect(200)
      .expect(/"Google"/); // expect some images with "Google" source
  });
});
