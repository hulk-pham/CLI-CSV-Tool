import axios from 'axios';
import { CRYPTO_EXCHANGE_URL } from '../core/config';
import { CRYPTO_EXCHANGE_API_KEY, CURRENCY } from './../core/config';

export async function getExchangeRate(tokens: string[]) {
  try {
    const { data } = await axios.get(CRYPTO_EXCHANGE_URL, {
      params: {
        fsyms: tokens?.join(','),
        tsyms: CURRENCY,
        api_key: CRYPTO_EXCHANGE_API_KEY
      }
    });
    return Object.keys(data).reduce(
      (result, key) => ({ ...result, [key]: data[key][CURRENCY] }),
      {}
    );
  } catch (error) {
    throw new Error('Fail to get exchange rate');
  }
}
