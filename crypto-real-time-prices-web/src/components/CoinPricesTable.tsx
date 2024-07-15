import { useAppDispatch, useAppSelector } from "@/lib/store";
import { CoinPricesService } from "@/services/api/coin-prices.service";
import { selectCoinCode, selectPrices, setPrices } from "@/services/store-slices/coin-price-slice";
import { formatNumber } from "@/utils/util-fn";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import { useEffect } from "react";

export function CoinPricesTable() {
  const appDispatch = useAppDispatch();
  const coinCode = useAppSelector(selectCoinCode);
  const prices = useAppSelector(selectPrices);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await CoinPricesService.getCoinPrices(coinCode);
        appDispatch(setPrices(response.prices));
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrices();

    const interval = setInterval(() => {
      fetchPrices();
    }, 1000 * 8);

    return () => clearInterval(interval);
  }, [appDispatch, coinCode]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Coin Code</TableCell>
            <TableCell align="right">Market Cap</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prices.map((record) => {
            return (
              <TableRow key={record._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {record.coinCode}
                </TableCell>
                <TableCell align="right">{formatNumber(record.marketCap)}</TableCell>
                <TableCell align="right">{formatNumber(record.price)}</TableCell>
                <TableCell align="right">
                  {dayjs(record.createdAt).format("YYYY-MM-DD, HH:mm:ss")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
