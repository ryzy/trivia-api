import { HttpModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ImageController } from './controllers/image.controller';
import { UnsplashApiService } from './services/unsplash-api.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, ImageController],
  providers: [UnsplashApiService],
})
export class AppModule {}
