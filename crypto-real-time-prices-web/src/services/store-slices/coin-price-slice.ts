import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CoinPrice } from "../api/coin-prices.service";

const coinCodes = ["BTC", "ETH", "USDT", "BNB", "SOL"];

export type CoinPriceState = {
  coinCodes: string[];
  coinCode: string;
  prices: CoinPrice[];
};

const initialState: CoinPriceState = {
  coinCodes: coinCodes,
  coinCode: coinCodes[0],
  prices: [],
};

export const coinPricesSlice = createSlice({
  name: "coinPrices",
  initialState,
  reducers: {
    setCoinCode: (state, action: PayloadAction<string>) => {
      state.coinCode = action.payload;
      state.prices = [];
    },
    setPrices: (state, action: PayloadAction<CoinPrice[]>) => {
      state.prices = action.payload;
    },
  },
  selectors: {
    selectCoinCode: (state: CoinPriceState) => state.coinCode,
    selectPrices: (state: CoinPriceState) => state.prices,
    selectCoinCodes: (state: CoinPriceState) => state.coinCodes,
  },
});

export const { setCoinCode, setPrices } = coinPricesSlice.actions;
export const { selectCoinCode, selectCoinCodes, selectPrices } = coinPricesSlice.selectors;
