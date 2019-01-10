import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NGX_TRIVIA_API_MODULE_CONFIG, NgxTriviaApiModuleConfig } from '../di';

@Injectable({
  providedIn: 'root',
})
export class TriviaDataService {
  constructor(
    protected http: HttpClient,
    @Inject(NGX_TRIVIA_API_MODULE_CONFIG)
    protected config: NgxTriviaApiModuleConfig,
  ) {}

  public getImages(query: string): Observable<any> {
    return this.http.get(this.config.apiUrl + '/images/' + query);
  }
}
