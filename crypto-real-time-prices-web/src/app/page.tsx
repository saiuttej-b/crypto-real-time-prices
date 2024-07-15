"use client";

import { CoinPricesTable } from "@/components/CoinPricesTable";
import { CoinSelector } from "@/components/CoinSelector";
import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container
      maxWidth="md"
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2,
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          width: "100%",
        }}
        variant="h5"
      >
        Cryptocurrency Prices
      </Typography>
      <CoinSelector />
      <CoinPricesTable />
    </Container>
  );
}
