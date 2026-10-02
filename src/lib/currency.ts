const formatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

export const currencyFormat = (value: number) => formatter.format(value);
