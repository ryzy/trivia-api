import { Component, Input, OnInit } from '@angular/core';
import { TriviaDataService } from '../../services/trivia-data.service';

@Component({
  selector: 'ngx-trivia-api',
  templateUrl: './trivia-api.view.html',
  styleUrls: ['./trivia-api.view.scss'],
})
export class TriviaApiView implements OnInit {
  @Input()
  public query: string = '';

  public constructor(protected service: TriviaDataService) {}

  public ngOnInit(): void {}
}
