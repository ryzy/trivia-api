import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AxiosRequestConfig, AxiosError } from 'axios';
import { makePagedResult, Paged, Image } from 'ngx-trivia-api';

import { environment } from '../environment/environment';

export interface UnsplashSearchQueryParams {
  query: string;
  page?: number; // 1+
}

const requestConfig: AxiosRequestConfig = {
  headers: {
    Authorization: `Client-ID ${environment.unsplashApiKey}`,
  },
};

export function unsplashToImage(data: any = {}): Image {
  return {
    id: data.id,
    caption: data.description,
    location: data.location && data.location.title,
    license: 'cc_attribute',
    source: 'Unsplash',
    links: {
      html: data.links && data.links.html,
      large: data.urls && data.urls.full,
      regular: data.urls && data.urls.regular,
      small: data.urls && data.urls.small,
      thumb: data.urls && data.urls.thumb,
    },
    author: {
      name: data.user && data.user.name,
      url: data.user && data.user.links && data.user.links.html,
      avatar: data.user && data.user.profile_image && data.user.profile_image.large,
      twitter: data.user && data.user.twitter_username,
    },
  };
}

export function catchUnsplashError(e: AxiosError): Observable<never> {
  // console.warn('UNSPLASH ERROR', e);
  const errors: string[] = (e.response && e.response.data && e.response.data.errors) || ['Internal Server Error'];
  throw new HttpException(
    {
      errors,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    },
    500,
  );
}

/**
 * @url https://unsplash.com/documentation
 */
@Injectable()
export class UnsplashApiService {
  public constructor(private http: HttpService) {}

  /**
   * Get full image details
   */
  public getImage(imageId: string = 'random'): Observable<Image> {
    return this.http.get<Image>(`https://api.unsplash.com/photos/${imageId}`, requestConfig).pipe(
      map((v) => unsplashToImage(v && v.data)),
      catchError(catchUnsplashError),
    );
  }

  /**
   * Query/search for images
   */
  public getImages(queryParams: Partial<UnsplashSearchQueryParams>): Observable<Paged<Image>> {
    // Support empty query, then simply call to the list of recent photos
    const url = `https://api.unsplash.com` + (queryParams.query ? `/search/photos` : `/photos`);
    const pageSize = 10;
    const page = parseInt(queryParams.page as any, 10) || 1;

    return this.http.get(url, { ...requestConfig, params: queryParams }).pipe(
      // tap(v => console.log('UnsplashApiService#getImages', v)),
      map((v) => {
        // When making request to url with query, the response is slightly different...
        const items = v.data.results || v.data || [];
        const images = items.map((imageData: any) => unsplashToImage(imageData));

        return makePagedResult<Image>(images, v.data.total || items.length, page, pageSize);
      }),
      catchError(catchUnsplashError),
    );
  }
}
