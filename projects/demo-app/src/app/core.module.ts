import { NgModule } from '@angular/core';
import { NgxTriviaApiModule } from 'ngx-trivia-api';

@NgModule({
  imports: [
    NgxTriviaApiModule.forRoot({
      apiUrl: 'http://localhost:3000',
    }),
  ],
  exports: [],
})
export class CoreModule {}
