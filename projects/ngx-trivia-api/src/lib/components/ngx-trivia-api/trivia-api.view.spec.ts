import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaApiView } from './trivia-api.view';

describe('TriviaApiView', () => {
  let component: TriviaApiView;
  let fixture: ComponentFixture<TriviaApiView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TriviaApiView],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriviaApiView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
