import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinPricesModule } from './coin-prices/coin-prices.module';
import { EnvSchema, EnvType } from './utils/env';
import { mongoConfig } from './utils/mongoose-fn';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        return EnvSchema.parse(config);
      },
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvType>) => {
        const uri = mongoConfig({
          host: configService.get('MONGO_DB_HOST'),
          username: configService.get('MONGO_DB_USERNAME'),
          password: configService.get('MONGO_DB_PASSWORD'),
          dbName: configService.get('MONGO_DB_DATABASE'),
        });

        return {
          uri: uri,
          autoIndex: configService.get('MONGO_DB_AUTO_INDEX') === 'true',
        };
      },
    }),
    ScheduleModule.forRoot(),
    CoinPricesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
