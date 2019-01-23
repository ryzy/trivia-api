import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AxiosError } from 'axios';
import { Explanation, Image, makePagedResult, Paged } from 'ngx-trivia-api';

import { environment } from '../environment/environment';

export function googleResultToImage(googleItem: any = {}, idx: number): Image {
  return {
    id: 'google-image-' + idx,
    caption: googleItem.snippet,
    license: 'cc_publicdomain',
    source: 'Google',
    links: {
      html: googleItem.image && googleItem.image.contextLink,
      large: googleItem.link,
      regular: googleItem.link,
      small: googleItem.link,
      thumb: googleItem.image && googleItem.image.thumbnailLink,
    },
  };
}

export function googleResultToExplanation(googleItem: any = {}): Explanation {
  const res = googleItem.result || {};
  return {
    source: 'Google',
    id: res['@id'],

    name: res.name,
    description:
      (res.detailedDescription &&
        res.detailedDescription.articleBody &&
        (res.detailedDescription.articleBody as string).trim()) ||
      res.description,
    type: res['@type'] || [],
    url: res.detailedDescription && res.detailedDescription.url,
    license: res.detailedDescription && res.detailedDescription.license,
  };
}

export function catchGoogleError(e: AxiosError): Observable<never> {
  // console.warn('GOOGLE API ERROR', e);
  const apiUrl = e.response && e.response.config.url;
  const error: { code: number; message: string } = (e.response && e.response.data && e.response.data.error) || {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error',
  };

  error.message = error.message + (apiUrl ? ` for API url ${apiUrl}` : '');

  throw new HttpException(
    {
      errors: [error.message],
      status: error.code,
    },
    error.code,
  );
}

export interface GoogleSearchQueryParams {
  key: string;
  q: string;
  cx: string;
  searchType: 'image';
  num?: number; // number of items per page
  start?: number; // index of the first result to return
  imgType?: string;
  imgColorType?: string;
  imgSize?: string;
  rights?: string;
}

export interface GoogleExplainQueryParams {
  key: string;
  query: string;
  limit?: number;
}

@Injectable()
export class GoogleApiService {
  public constructor(private http: HttpService) {}

  /**
   * Query/search for images
   */
  public getImages(params: Partial<GoogleSearchQueryParams & { page?: number }>): Observable<Paged<Image>> {
    const pageSize = params.num || 10;
    const page = (params.page && parseInt(params.page as any, 10)) || 1;
    const startIndex = page * pageSize;

    const queryParams: GoogleSearchQueryParams = {
      key: environment.googleApiKey,
      start: startIndex,
      cx: '008566752007922597801:rqqggvotr4s',
      searchType: 'image',
      imgType: 'photo',
      imgColorType: 'color',
      imgSize: 'huge',
      rights: 'cc_publicdomain',
      ...(params as GoogleSearchQueryParams),
    };

    const url = `https://www.googleapis.com/customsearch/v1`;
    return this.http.get(url, { params: queryParams }).pipe(
      // tap(v => console.log('GoogleApiService#getImages data', v.data)),
      map((v) => v.data || {}),
      map((data) => {
        const items = (data.items || []).map(googleResultToImage);
        const pageInfo = (data.queries && data.queries.nextPage && data.queries.nextPage[0]) || {};
        return makePagedResult<Image>(items, pageInfo.totalResults, page, pageSize);
      }),
      catchError(catchGoogleError),
    );
  }

  /**
   * Query Knowledge API
   */
  public getExplanations(params: Partial<GoogleExplainQueryParams>): Observable<Explanation[]> {
    const url = `https://kgsearch.googleapis.com/v1/entities:search`;

    const queryParams: GoogleExplainQueryParams = {
      key: environment.googleApiKey,
      limit: 5,
      ...(params as GoogleExplainQueryParams),
    };

    return this.http.get(url, { params: queryParams }).pipe(
      // tap(v => console.log('GoogleApiService#getExplanation', v)),
      map((v) => (v.data && v.data.itemListElement) || []),
      map((images: any[]) => images.map(googleResultToExplanation)),
      catchError(catchGoogleError),
    );
  }
}
