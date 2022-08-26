import { DataParsed } from './../../dist/core/type.d';
import loki from 'lokijs';
import { LOG_FILE_PATH } from './config';
import { parse } from 'csv-parse';
import fs from 'fs';
import { TransactionType } from './type';

export const db = new loki('propine.db');
export const tokensCol = db.addCollection('tokens');

function appendData(row: any) {
  const [timestamp, transaction_type, token, amount] = row;
  const transactionDate = +(
    new Date(timestamp * 1000).setHours(0, 0, 0, 0) / 1000
  );
  const volatileAmount =
    amount * (transaction_type === TransactionType.DEPOSIT ? 1 : -1);
  const transactionObj = {
    timestamp,
    transaction_type,
    token,
    amount
  };
  const tokenRecord = tokensCol.findOne({ token: token });
  if (tokenRecord) {
    const tokenData = tokenRecord.data;

    tokenData.balance += volatileAmount;
    if (transactionDate in tokenData.history) {
      tokenData.history[transactionDate].date_volatile += volatileAmount;
      tokenData.history[transactionDate].date_transactions.push(transactionObj);
    } else {
      tokenData.history[transactionDate] = {
        date_volatile: volatileAmount,
        date_transactions: [transactionObj]
      };
    }
    tokensCol.update(tokenRecord);
  } else {
    tokensCol.insert({
      token,
      data: {
        balance: volatileAmount,
        history: {
          [transactionDate]: {
            date_volatile: volatileAmount,
            date_transactions: [transactionObj]
          }
        }
      }
    });
  }
}

export function initData(): Promise<null> {
  return new Promise((resolve, reject) => {
    tokensCol.clear();
    fs.createReadStream(LOG_FILE_PATH)
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', function (row) {
        appendData(row);
      })
      .on('end', function () {
        console.log('[*] Done load data !!!');
        resolve(null);
      })
      .on('error', function (error) {
        reject(error);
      });
  });
}

export async function getLogData() {
  const tokens = await tokensCol.find();
  let result = {};
  tokens.forEach(token => {
    result[token.token] = token.data;
  });
  return result as DataParsed;
}
