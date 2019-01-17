import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTriviaApiTestingModule } from '../../../testing/ngx-trivia-api-testing.module';
import { TriviaApiView } from './trivia-api.view';

describe('TriviaApiView', () => {
  let component: TriviaApiView;
  let fixture: ComponentFixture<TriviaApiView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxTriviaApiTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriviaApiView);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
