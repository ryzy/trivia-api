import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Image } from '../../model/image';

@Component({
  selector: 'ngx-trivia-image',
  templateUrl: './trivia-image.component.html',
  styleUrls: ['./trivia-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TriviaImageComponent {
  @Input() public image!: Image;

  @Output()
  public select: EventEmitter<Image> = new EventEmitter();

  public clicked(): void {
    this.select.emit(this.image);
  }
}
