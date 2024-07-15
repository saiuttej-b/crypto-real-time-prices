"use client";

import { axiosInstance } from "@/lib/axios";

export type CoinPrices = {
  coinCode: string;
  prices: CoinPrice[];
};

export type CoinPrice = {
  _id: string;
  coinCode: string;
  marketCap: number;
  price: number;
  createdAt: string;
};

export class CoinPricesService {
  static async getCoinPrices(coinCode: string) {
    const res = await axiosInstance.get<CoinPrices>(`/coin-prices`, {
      params: {
        coinCode,
      },
    });
    return res.data;
  }
}
