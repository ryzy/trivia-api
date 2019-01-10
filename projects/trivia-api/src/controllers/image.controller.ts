import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Image } from 'ngx-trivia-api';

import { UnsplashApiService } from '../services/unsplash-api.service';

@Controller()
export class ImageController {
  constructor(private readonly unsplashApi: UnsplashApiService) {}

  @Get('unsplash/images')
  getImages(@Query() queryParams: { q?: string }): Observable<Image[]> {
    return this.unsplashApi.getImages(queryParams.q);
  }
}
