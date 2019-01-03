import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ImageService } from './services/image.service';
import { Image } from './model/image';

@Controller()
export class AppController {
  constructor(private readonly service: ImageService) {}

  @Get('image/:id')
  getImage(@Param() params: { id?: string }): Observable<Image> {
    return this.service.getImage(params.id);
  }

  @Get('images')
  getImages(): Observable<Image[]> {
    return this.service.getImages();
  }

  @Get('images/:query')
  searchImages(@Param() params: { query: string }): Observable<Image[]> {
    return this.service.getImages(params.query);
  }
}
