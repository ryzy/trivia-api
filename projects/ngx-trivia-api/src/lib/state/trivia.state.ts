import { State, Selector, Store, Select, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Explanation } from '../model/explanation';
import { Image } from '../model/image';
import { Paged } from '../model/paged';
import { TriviaApiService } from '../services/trivia-api.service';
import {
  ExplanationsLoadedAction,
  ImagesLoadedAction,
  LoadExplanationsAction,
  LoadImagesAction,
  SetActiveSectionAction,
  SetQueryAction,
  UpdateResultsAction,
} from './trivia.actions';

export enum ActiveSection {
  ImageUnsplash = 'ImageUnsplash',
  ImageGoogle = 'ImageGoogle',
  Explanation = 'Explanation',
}
export const defaultActiveSection: ActiveSection = ActiveSection.ImageUnsplash;

export interface TriviaStateModel {
  query: string;
  activeSection: ActiveSection;
  images: Image[];
  explanations: Explanation[];
}
export interface RootStateModel {
  trivia: TriviaStateModel;
}

@State<TriviaStateModel>({
  name: 'trivia',
  defaults: {
    query: '',
    activeSection: defaultActiveSection,
    images: [],
    explanations: [],
  },
})
export class TriviaState {
  @Select(TriviaState.query) public query$!: Observable<string>;
  @Select(TriviaState.images) public images$!: Observable<Image[]>;
  @Select(TriviaState.explanations) public explanations$!: Observable<Explanation[]>;

  @Selector()
  public static query(state: RootStateModel): string {
    return state.trivia.query;
  }

  @Selector()
  public static images(state: RootStateModel): Image[] {
    return state.trivia.images;
  }

  @Selector()
  public static explanations(state: RootStateModel): Explanation[] {
    return state.trivia.explanations;
  }

  public constructor(protected store: Store, protected api: TriviaApiService) {}

  public dispatchNewQuery(query: string): Observable<TriviaStateModel> {
    return this.store.dispatch(new SetQueryAction(query));
  }

  public dispatchSetActiveSection(activeSection: ActiveSection): Observable<TriviaStateModel> {
    return this.store.dispatch(new SetActiveSectionAction(activeSection));
  }

  @Action(SetQueryAction)
  protected setQuery(ctx: StateContext<TriviaStateModel>, action: SetQueryAction): void {
    ctx.patchState({ query: action.query });
    ctx.dispatch(new UpdateResultsAction());
  }

  @Action(LoadImagesAction)
  protected loadImages(ctx: StateContext<TriviaStateModel>, action: LoadImagesAction): Observable<TriviaStateModel> {
    const query = ctx.getState().query;
    let apiRes: Observable<any>;

    if (ActiveSection.ImageGoogle === action.subSection) {
      apiRes = this.api.getGoogleImages(query);
    } else {
      apiRes = this.api.getUnsplashImages(query);
    }
    return apiRes.pipe(
      tap((data: Paged<Image>) => {
        return this.store.dispatch(new ImagesLoadedAction(data));
      }),
      map(() => ctx.getState()),
    );
  }

  @Action(ImagesLoadedAction)
  protected setImages(ctx: StateContext<TriviaStateModel>, action: ImagesLoadedAction): void {
    ctx.patchState({
      images: action.data.items,
    });
  }

  @Action(LoadExplanationsAction)
  protected loadExplanations(
    ctx: StateContext<TriviaStateModel>,
    action: LoadExplanationsAction,
  ): Observable<TriviaStateModel> {
    return this.api.getExplanations(ctx.getState().query).pipe(
      tap((data: Explanation[]) => {
        return this.store.dispatch(new ExplanationsLoadedAction(data));
      }),
      map(() => ctx.getState()),
    );
  }

  @Action(ExplanationsLoadedAction)
  protected setExplanations(ctx: StateContext<TriviaStateModel>, action: ExplanationsLoadedAction): void {
    ctx.patchState({
      explanations: action.data,
    });
  }

  @Action(SetActiveSectionAction)
  protected setActiveSection(ctx: StateContext<TriviaStateModel>, action: SetActiveSectionAction): void {
    ctx.patchState({
      activeSection: action.activeSection,
    });
    ctx.dispatch(new UpdateResultsAction());
  }

  @Action(UpdateResultsAction)
  protected updateResults(ctx: StateContext<TriviaStateModel>, action: UpdateResultsAction): Observable<any> {
    const activeSection = ctx.getState().activeSection;
    return ctx.dispatch(
      activeSection === ActiveSection.Explanation
        ? new LoadExplanationsAction()
        : activeSection === ActiveSection.ImageGoogle
        ? new LoadImagesAction(ActiveSection.ImageGoogle)
        : new LoadImagesAction(ActiveSection.ImageUnsplash),
    );
  }
}
