import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { TriviaApiView } from './components/ngx-trivia-api/trivia-api.view';
import { NGX_TRIVIA_API_MODULE_CONFIG, NgxTriviaApiModuleConfig } from './di';

@NgModule({
  declarations: [TriviaApiView],
  imports: [HttpClientModule, MatFormFieldModule, MatInputModule],
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
