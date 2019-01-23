import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Explanation } from '../../model/explanation';

@Component({
  selector: 'ngx-trivia-explanation',
  templateUrl: './trivia-explanation.component.html',
  styleUrls: ['./trivia-explanation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TriviaExplanationComponent {
  @Input() public explanation!: Explanation;

  @Output()
  public select: EventEmitter<Explanation> = new EventEmitter();

  public clicked(): void {
    this.select.emit(this.explanation);
  }
}
