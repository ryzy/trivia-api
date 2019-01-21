import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule, MatListModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { NgxTriviaApiModule } from 'ngx-trivia-api';

const IMPORT_EXPORT_MODULES: any[] = [CommonModule, MatIconModule, MatCardModule, MatListModule];

@NgModule({
  imports: IMPORT_EXPORT_MODULES,
  exports: [
    ...IMPORT_EXPORT_MODULES,
    NgxTriviaApiModule, // imported with config in root module, but here we export its components
  ],
})
export class SharedModule {}
