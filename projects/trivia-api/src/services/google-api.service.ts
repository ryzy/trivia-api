import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AxiosError } from 'axios';
import { Image } from 'ngx-trivia-api';

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

export function catchGoogleError(e: AxiosError): Observable<never> {
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
  searchType?: 'image';
  imgType?: string;
  imgColorType?: string;
  imgSize?: string;
  rights?: string;
}

@Injectable()
export class GoogleApiService {
  public constructor(private http: HttpService) {}

  /**
   * Query/search for images
   */
  public getImages(params: Partial<GoogleSearchQueryParams>): Observable<Image[]> {
    const url = `https://www.googleapis.com/customsearch/v1`;
    const queryParams: GoogleSearchQueryParams = {
      key: environment.googleApiKey,
      cx: '008566752007922597801:rqqggvotr4s',
      searchType: 'image',
      imgType: 'photo',
      imgColorType: 'color',
      imgSize: 'huge',
      rights: 'cc_publicdomain',
      ...(params as GoogleSearchQueryParams),
    };

    return this.http.get(url, { params: queryParams }).pipe(
      // tap(v => console.log('GoogleApiService#getImages', v)),
      map((v) => (v.data && v.data && v.data.items) || []),
      map((images: any[]) => images.map(googleResultToImage)),
      catchError(catchGoogleError),
    );
  }
}
