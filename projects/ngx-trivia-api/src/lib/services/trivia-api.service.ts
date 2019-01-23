import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NGX_TRIVIA_API_MODULE_CONFIG, NgxTriviaApiModuleConfig } from '../di';
import { Explanation } from '../model/explanation';
import { Image } from '../model/image';
import { Paged } from '../model/paged';

@Injectable({
  providedIn: 'root',
})
export class TriviaApiService {
  constructor(
    protected http: HttpClient,
    @Inject(NGX_TRIVIA_API_MODULE_CONFIG)
    protected config: NgxTriviaApiModuleConfig,
  ) {}

  public getUnsplashImages(query: string): Observable<Paged<Image>> {
    return this.http.get<Paged<Image>>(this.config.apiUrl + '/unsplash/images', { params: { q: query } });
  }

  public getGoogleImages(query: string): Observable<Paged<Image>> {
    return this.http.get<Paged<Image>>(this.config.apiUrl + '/google/images', { params: { q: query } });
  }

  public getExplanations(query: string): Observable<Explanation[]> {
    return this.http.get<Explanation[]>(this.config.apiUrl + '/explain', { params: { q: query } });
  }
}
