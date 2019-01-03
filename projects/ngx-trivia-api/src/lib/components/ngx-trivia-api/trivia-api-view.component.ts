import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-trivia-api',
  templateUrl: './trivia-api.view.html',
  styleUrls: ['./trivia-api.view.scss'],
})
export class TriviaApiView implements OnInit {
  @Input()
  public query: string;

  // public constructor(service: )

  public ngOnInit(): void {
    console.log('TriviaApiView', this);
  }
}
