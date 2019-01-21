/* tslint:disable:typedef */
import { Explanation } from '../model/explanation';
import { Image } from '../model/image';
import { Paged } from '../model/paged';
import { ActiveSection } from './trivia.state';

export class SetQueryAction {
  public static readonly type = '[Trivia] Set Query';
  public constructor(public query: string) {}
}

export class LoadImagesAction {
  public static readonly type = '[Trivia] Load images...';
  public constructor(public subSection: ActiveSection) {}
}

export class ImagesLoadedAction {
  public static readonly type = '[Trivia] Images Loaded';
  public constructor(public data: Paged<Image>) {}
}

export class LoadExplanationsAction {
  public static readonly type = '[Trivia] Load explanations...';
  public constructor() {}
}

export class ExplanationsLoadedAction {
  public static readonly type = '[Trivia] Explanations Loaded';
  public constructor(public data: Explanation[]) {}
}

export class SetActiveSectionAction {
  public static readonly type = '[Trivia] Set active section';
  public constructor(public activeSection: ActiveSection) {}
}

export class UpdateResultsAction {
  public static readonly type = '[Trivia] Update (fetch) results...';
}
