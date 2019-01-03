import { MatCardModule, MatListModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgxImageApiModule } from 'ngx-image-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatCardModule,
    MatListModule,

    NgxImageApiModule.forRoot({
      apiUrl: 'http://localhost:3000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
