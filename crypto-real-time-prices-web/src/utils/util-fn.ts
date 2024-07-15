export function formatNumber(value?: number) {
  if (value === null || value === undefined) return "-";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 4,
    minimumFractionDigits: 0,
  }).format(value);
}
