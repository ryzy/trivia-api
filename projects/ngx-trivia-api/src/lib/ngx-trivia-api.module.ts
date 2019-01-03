import { ModuleWithProviders, NgModule } from '@angular/core';

import { TriviaApiView } from './components/ngx-trivia-api/trivia-api-view.component';
import { NGX_TRIVIA_API_MODULE_CONFIG, NgxTriviaApiModuleConfig } from './di';

@NgModule({
  declarations: [TriviaApiView],
  imports: [],
  exports: [TriviaApiView],
})
export class NgxTriviaApiModule {
  public static forRoot(config: NgxTriviaApiModuleConfig): ModuleWithProviders {
    return {
      ngModule: NgxTriviaApiModule,
      providers: [{ provide: NGX_TRIVIA_API_MODULE_CONFIG, useValue: config }],
    };
  }
}
