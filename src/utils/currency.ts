export const currencyFormat = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
}).format
