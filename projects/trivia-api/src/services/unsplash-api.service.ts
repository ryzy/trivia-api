import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AxiosRequestConfig, AxiosError } from 'axios';
import { Image } from 'ngx-trivia-api';

import { environment } from '../environment/environment';

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
  const errors: string[] = (e.response && e.response.data && e.response.data.errors) || ['Internal Server Error'];
  throw new HttpException(
    {
      errors,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    },
    500,
  );
}

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
  public getImages(query?: string): Observable<Image[]> {
    // Support empty query, then simply call to the list of recent photos
    const url = `https://api.unsplash.com` + (query ? `/search/photos` : `/photos`);

    return this.http.get(url, { ...requestConfig, params: { query } }).pipe(
      // When making request to url with query, the response is slightly different...
      map((v) => (v.data && v.data.results) || v.data || []),
      map((images: any[]) => images.map((v) => unsplashToImage(v))),
      catchError(catchUnsplashError),
    );
  }
}
