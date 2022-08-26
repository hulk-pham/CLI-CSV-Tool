#! /usr/bin/env node
require('dotenv').config();

import { program } from 'commander';
import { getBalances, getLogData, initData } from '../core';
import { CURRENCY } from '../core/config';
import { parseAndValidateParams } from '../core/validate';
import { getExchangeRate } from '../utils/exchange-rate';
import { currencyFormat } from '../utils/format';

program
  .option('-t, --token <char>', 'token name, exp: ETH')
  .option(
    '-d, --date <char>',
    'date when to query (format: YYYY-MM-DD), exp: 2022-04-22'
  );

program.parse();

const options = program.opts();

async function main() {
  try {
    console.log(`CRYPTO CLI APPLICATION \n\n`);
    console.log('[*] Loading data...');
    await initData();
    const logData = await getLogData();
    const { date, token } = parseAndValidateParams(
      options,
      Object.keys(logData)
    );

    const balances = getBalances(logData, token, date);
    const exchangeRates = await getExchangeRate(Object.keys(balances));
    console.log('[*] Getting exchange rate...');
    setTimeout(function () {
      console.log('[*] Portfolio generating...\n');
      for (const [token, balance] of Object.entries(balances)) {
        const balanceFormatted = currencyFormat(
          balance * exchangeRates?.[token],
          2
        );
        console.log(`*************** Portfolio of ${token} ***************`);
        console.log(`-     Token: ${token}   `);
        console.log(`-     Balance: ${balanceFormatted} ${CURRENCY}  `);
        console.log(`************************************************\n`);
      }
    }, 1000);
  } catch (error) {
    console.log((error as Error).message);
  }
}
main();
