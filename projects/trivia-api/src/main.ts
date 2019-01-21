import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap(): Promise<any> {
  const app = await NestFactory.create(AppModule, {
    // cors: { origin: environment.allowOrigin }
  });
  app.enableCors();
  await app.listen(80);
}
bootstrap();
