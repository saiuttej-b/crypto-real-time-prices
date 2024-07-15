import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { Model } from 'mongoose';
import { EnvType } from 'src/utils/env';
import { GetCoinPricesDto } from '../dtos/get-coin-prices.dto';
import { CoinPrice } from '../schemas/coin-price.schema';
import { LiveCoinPrice } from '../types/live-coin-prices.types';

export const CoinCodes = ['BTC', 'ETH', 'USDT', 'BNB', 'SOL'];

@Injectable()
export class CoinPricesService {
  private readonly logger = new Logger(CoinPricesService.name);

  constructor(
    @InjectModel(CoinPrice.name) private readonly coinPriceModel: Model<CoinPrice>,
    private readonly configService: ConfigService<EnvType>,
  ) {}

  async getCoinLatestPrices(query: GetCoinPricesDto) {
    const prices = await this.coinPriceModel
      .find({ coinCode: query.coinCode })
      .sort({ createdAt: -1 })
      .limit(query.limit || 20)
      .exec();
    return {
      coinCode: query.coinCode,
      prices,
    };
  }

  @Cron('*/5 * * * * *')
  async fetchCoinPrices() {
    if (this.configService.get('DISABLE_FETCH_LIVE_COIN_PRICES') === 'true') return;

    this.logger.log('Fetching latest coin prices');

    try {
      const latestRecords = await axios.post<LiveCoinPrice[]>(
        'https://api.livecoinwatch.com/coins/map',
        JSON.stringify({
          codes: CoinCodes,
          currency: 'USD',
          sort: 'rank',
          order: 'ascending',
          meta: false,
        }),
        {
          headers: {
            'content-type': 'application/json',
            'x-api-key': this.configService.get('LIVE_COIN_WATCH_API_KEY'),
          },
        },
      );

      const records = latestRecords.data.map((record) => {
        const coinPrice = new this.coinPriceModel({
          coinCode: record.code,
          price: record.rate,
          marketCap: record.cap,
        });
        return coinPrice;
      });
      await this.coinPriceModel.insertMany(records);

      this.logger.log('Fetched latest coin prices');
    } catch (error) {
      this.logger.error('Failed to fetch latest coin prices');
      console.error(error);
    }
  }
}
