import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule } from '@angular/material';
import { NgxsModule } from '@ngxs/store';

import { TriviaApiView } from './components/ngx-trivia-api/trivia-api.view';
import { TriviaExplanationComponent } from './components/ngx-trivia-explanation/trivia-explanation.component';
import { TriviaImageComponent } from './components/ngx-trivia-image/trivia-image.component';
import { NGX_TRIVIA_API_MODULE_CONFIG, NgxTriviaApiModuleConfig } from './di';
import { TriviaState } from './state/trivia.state';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    NgxsModule.forFeature([TriviaState]),
  ],
  declarations: [TriviaApiView, TriviaExplanationComponent, TriviaImageComponent],
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
