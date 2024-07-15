import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class GetCoinPricesDto {
  @IsNotEmpty({ message: 'Coin code is required' })
  @IsString()
  @IsIn(['BTC', 'ETH', 'USDT', 'BNB', 'SOL'])
  coinCode: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;
}
