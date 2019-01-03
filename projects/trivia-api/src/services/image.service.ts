import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AxiosRequestConfig, AxiosError } from 'axios';

import { environment } from '../environment/environment';
import { Image, unsplashToImage } from '../model/image';

const requestConfig: AxiosRequestConfig = {
  headers: {
    Authorization: `Client-ID ${environment.unsplashApiKey}`,
  },
};

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
export class ImageService {
  public constructor(private http: HttpService) {}

  getImage(imageId: string = 'random'): Observable<Image> {
    return this.http.get<Image>(`https://api.unsplash.com/photos/${imageId}`, requestConfig).pipe(
      map((v) => unsplashToImage(v && v.data)),
      catchError(catchUnsplashError),
    );
  }

  getImages(query?: string): Observable<Image[]> {
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
