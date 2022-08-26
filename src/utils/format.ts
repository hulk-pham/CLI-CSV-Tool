export function currencyFormat(value, decimal: number = 2) {
  return value.toFixed(decimal).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
