import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';
import { AppModule } from './app.module';
import { EnvType } from './utils/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService<EnvType>>(ConfigService);

  app.setGlobalPrefix('api');

  app.enableCors((req, callback) => {
    const origin = req.header('Origin');
    const corsOrigin = configService.get<string>('CORS_ORIGIN');

    let allowed = false;
    if (!origin || corsOrigin === '*' || corsOrigin?.split(',').includes(origin)) {
      allowed = true;
    }

    callback(null, {
      origin: allowed,
      methods: 'GET,PUT,PATCH,POST,DELETE',
    });
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      validateCustomDecorators: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  mongoose.set('debug', true);

  const PORT = configService.get<string>('PORT') || 3000;
  await app.listen(PORT, '0.0.0.0', () => {
    Logger.log(`Server is running on: http://localhost:${PORT}/api`, 'Main');
  });
}
bootstrap();
