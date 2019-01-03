import { MatCardModule, MatListModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgxTriviaApiModule } from 'ngx-trivia-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatCardModule,
    MatListModule,

    NgxTriviaApiModule.forRoot({
      apiUrl: 'http://localhost:3000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
