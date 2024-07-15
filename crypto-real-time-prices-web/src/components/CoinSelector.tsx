"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  selectCoinCode,
  selectCoinCodes,
  setCoinCode,
} from "@/services/store-slices/coin-price-slice";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export function CoinSelector() {
  const appDispatch = useAppDispatch();
  const coinCode = useAppSelector(selectCoinCode);
  const coinCodes = useAppSelector(selectCoinCodes);

  return (
    <FormControl sx={{ minWidth: 200 }} size="small">
      <InputLabel id="coin-select-label">Select Coin</InputLabel>
      <Select
        labelId="coin-select-label"
        id="coin-select"
        label="Select Coin"
        inputProps={{
          id: "coin-select",
        }}
        value={coinCode}
        onChange={(e) => {
          appDispatch(setCoinCode(e.target.value));
        }}
      >
        {coinCodes.map((coin) => (
          <MenuItem key={coin} value={coin}>
            {coin}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
