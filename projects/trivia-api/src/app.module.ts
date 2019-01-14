import { HttpModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ImageController } from './controllers/image.controller';
import { GoogleApiService } from './services/google-api.service';
import { UnsplashApiService } from './services/unsplash-api.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, ImageController],
  providers: [GoogleApiService, UnsplashApiService],
})
export class AppModule {}
