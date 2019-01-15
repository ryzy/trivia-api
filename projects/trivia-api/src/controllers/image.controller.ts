import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Image, Paged } from 'ngx-trivia-api';

import { GoogleApiService, GoogleSearchQueryParams } from '../services/google-api.service';
import { UnsplashApiService, UnsplashSearchQueryParams } from '../services/unsplash-api.service';

@Controller()
export class ImageController {
  constructor(private readonly unsplashApi: UnsplashApiService, private readonly googleApi: GoogleApiService) {}

  @Get('unsplash/images')
  getUnsplashImages(
    @Query() queryParams: Partial<UnsplashSearchQueryParams> & { q?: string },
  ): Observable<Paged<Image>> {
    const { q, ...remainingQueryParams } = queryParams;
    return this.unsplashApi.getImages({
      query: q, // map `q` to `query`, as expected by unsplash api in this case
      ...remainingQueryParams,
    });
  }

  @Get('google/images')
  getGoogleImages(@Query() queryParams: Partial<GoogleSearchQueryParams>): Observable<Paged<Image>> {
    return this.googleApi.getImages(queryParams);
  }
}
