import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Explanation } from '../../model/explanation';
import { Image } from '../../model/image';
import { TriviaApiService } from '../../services/trivia-api.service';
import { ActiveSection, defaultActiveSection, TriviaState } from '../../state/trivia.state';

@Component({
  selector: 'ngx-trivia-api',
  templateUrl: './trivia-api.view.html',
  styleUrls: ['./trivia-api.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class TriviaApiView implements OnInit, OnDestroy {
  @Input()
  public set newQuery(query: string) {
    this.state.dispatchNewQuery(query);
    this.query = query;
  }

  @Input()
  public activeSection: ActiveSection = defaultActiveSection;

  @Output()
  public imageSelected: EventEmitter<Image> = new EventEmitter();

  @Output()
  public explanationSelected: EventEmitter<Explanation> = new EventEmitter();

  public query: string = '';

  public queryInput: FormControl = new FormControl(this.query);

  public images$: Observable<Image[]>;
  public explanations$: Observable<Explanation[]>;

  public ActiveSection: typeof ActiveSection = ActiveSection;

  private onDestroy$: EventEmitter<boolean> = new EventEmitter();

  public constructor(protected service: TriviaApiService, public state: TriviaState) {
    this.images$ = state.images$;
    this.explanations$ = state.explanations$;
  }

  public ngOnInit(): void {
    // Also listen for "manual" changes in query, so user can search for anything,
    // not just for what came from `newQuery` @Input
    this.queryInput.valueChanges
      .pipe(
        map((v?: string) => (v && v.trim()) || ''),
        distinctUntilChanged(),
        debounceTime(200),
        takeUntil(this.onDestroy$),
      )
      .subscribe((query) => {
        this.newQuery = query;
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.emit(true);
  }

  public dispatchSetActiveSection(activeSection: ActiveSection): void {
    this.activeSection = activeSection;
    this.state.dispatchSetActiveSection(activeSection);
  }

  public selectExplanation(explanation: Explanation): void {
    this.explanationSelected.emit(explanation);
  }

  public selectImage(image: Image): void {
    this.imageSelected.emit(image);
  }
}
