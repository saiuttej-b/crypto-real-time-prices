import { Controller, Get, Query } from '@nestjs/common';
import { GetCoinPricesDto } from '../dtos/get-coin-prices.dto';
import { CoinPricesService } from '../services/coin-prices.service';

@Controller('coin-prices')
export class CoinPricesController {
  constructor(private readonly service: CoinPricesService) {}

  @Get()
  getCoinLatestPrices(@Query() query: GetCoinPricesDto) {
    return this.service.getCoinLatestPrices(query);
  }
}
