import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoinPricesController } from './controllers/coin-prices.controller';
import { CoinPrice, CoinPriceSchema } from './schemas/coin-price.schema';
import { CoinPricesService } from './services/coin-prices.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: CoinPrice.name, schema: CoinPriceSchema }])],
  controllers: [CoinPricesController],
  providers: [CoinPricesService],
})
export class CoinPricesModule {}
