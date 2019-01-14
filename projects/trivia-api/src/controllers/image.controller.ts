import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Image } from 'ngx-trivia-api';
import { GoogleApiService, GoogleSearchQueryParams } from '../services/google-api.service';

import { UnsplashApiService } from '../services/unsplash-api.service';

@Controller()
export class ImageController {
  constructor(private readonly unsplashApi: UnsplashApiService, private readonly googleApi: GoogleApiService) {}

  @Get('unsplash/images')
  getUnsplashImages(@Query() queryParams: { q?: string }): Observable<Image[]> {
    return this.unsplashApi.getImages(queryParams.q);
  }

  @Get('google/images')
  getGoogleImages(@Query() queryParams: Partial<GoogleSearchQueryParams>): Observable<Image[]> {
    return this.googleApi.getImages(queryParams);
  }
}
