import { Inject, Injectable } from '@angular/core';

import { NGX_TRIVIA_API_MODULE_CONFIG, NgxTriviaApiModuleConfig } from '../di';

@Injectable({
  providedIn: 'root',
})
export class TriviaApiService {
  constructor(
    @Inject(NGX_TRIVIA_API_MODULE_CONFIG)
    protected config: NgxTriviaApiModuleConfig,
  ) {}
}
