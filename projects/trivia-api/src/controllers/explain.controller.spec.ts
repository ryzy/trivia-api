import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles';

import { mockExplanations } from '../../../../test/fixtures/explanation';
import { GoogleApiService } from '../services/google-api.service';
import { ExplainController } from './explain.controller';

describe('ExplainController', () => {
  let app: TestingModule;
  let controller: ExplainController;
  let googleApi: GoogleApiService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ExplainController],
      providers: [GoogleApiService],
    }).compile();

    controller = app.get<ExplainController>(ExplainController);
    googleApi = app.get<GoogleApiService>(GoogleApiService);
  });

  describe('getExplanation', () => {
    it(
      'should get explanation',
      marbles((m) => {
        jest.spyOn(googleApi, 'getExplanations').mockReturnValue(of(mockExplanations));
        m.expect(controller.getExplanations({ q: 'foo' })).toBeObservable('(v|)', { v: mockExplanations });
      }),
    );
  });
});
