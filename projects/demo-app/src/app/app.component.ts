import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public queries: string[] = ['pretty', 'jaguar', 'beauty', 'fashion', 'food', 'forest'];

  public currentQuery: string;

  public constructor() {
    this.currentQuery = this.queries[0];
  }

  public onNewQuery(query: string): void {
    this.currentQuery = query;
  }
}
