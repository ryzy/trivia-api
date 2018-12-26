import { HttpModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ImageService } from './services/image.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [ImageService],
})
export class AppModule {}
