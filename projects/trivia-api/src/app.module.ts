import { HttpModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ExplainController } from './controllers/explain.controller';
import { ImageController } from './controllers/image.controller';
import { GoogleApiService } from './services/google-api.service';
import { UnsplashApiService } from './services/unsplash-api.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, ExplainController, ImageController],
  providers: [GoogleApiService, UnsplashApiService],
})
export class AppModule {}
