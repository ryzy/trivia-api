import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';

import { NGX_TRIVIA_API_MODULE_CONFIG } from '../lib/di';
import { NgxTriviaApiModule } from '../lib/ngx-trivia-api.module';

@NgModule({
  imports: [NoopAnimationsModule, HttpClientTestingModule, NgxsModule.forRoot(), NgxTriviaApiModule],
  providers: [{ provide: NGX_TRIVIA_API_MODULE_CONFIG, useValue: {} }],
})
export class NgxTriviaApiTestingModule {}
