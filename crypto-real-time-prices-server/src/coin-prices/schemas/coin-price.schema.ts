import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'coin_prices', timestamps: true })
export class CoinPrice {
  @Prop({ required: true, trim: true })
  coinCode: string;

  @Prop({ required: true })
  marketCap: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  createdAt: Date;
}

export const CoinPriceSchema = SchemaFactory.createForClass(CoinPrice);
CoinPriceSchema.index({ coinCode: 1, createdAt: -1 });
