import { NgModule } from '@angular/core';
import { NgxTriviaApiModule } from 'ngx-trivia-api';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    NgxTriviaApiModule.forRoot({
      apiUrl: environment.triviaApiUrl,
    }),
  ],
  exports: [],
})
export class CoreModule {}
