import { DataParsed } from './type';

function getBalanceOfToken(
  logData: DataParsed,
  tokenRequire: string,
  dateRequire: string
): number {
  if (!dateRequire) return logData[tokenRequire].balance;

  let balance = 0;

  for (const [dateKey, dateData] of Object.entries(
    logData[tokenRequire].history
  )) {
    if (dateKey <= dateRequire) balance += dateData.date_volatile;
  }
  return balance;
}

export function getBalances(
  logData: DataParsed,
  tokenRequire: string,
  dateRequire: string
): { [token: string]: number } {
  if (tokenRequire)
    return {
      [tokenRequire]: getBalanceOfToken(logData, tokenRequire, dateRequire)
    };
  let result = {};
  Object.keys(logData).forEach(token => {
    result[token] = getBalanceOfToken(logData, token, dateRequire);
  });
  return result;
}
