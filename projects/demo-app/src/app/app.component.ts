import { Component } from '@angular/core';
import { Explanation } from '../../../ngx-trivia-api/src/lib/model/explanation';
import { Image } from '../../../ngx-trivia-api/src/lib/model/image';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public queries: string[] = [
    'porsche',
    'mustang',
    'carrera',
    'pretty',
    'jaguar',
    'beauty',
    'fashion',
    'food',
    'forest',
  ];

  public newQuery: string = this.queries[0];

  public onNewQuery(query: string): void {
    this.newQuery = query;
  }

  public imageSelected(image: Image): void {
    console.log('AppComponent#imageSelected', image);
  }
  public explanationSelected(explanation: Explanation): void {
    console.log('AppComponent#explanationSelected', explanation);
  }
}
