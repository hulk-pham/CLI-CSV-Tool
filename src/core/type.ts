export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL'
}

export interface Transaction {
  timestamp: number;
  transaction_type: string;
  token: string;
  amount: number;
}

export interface TransactionByDate {
  date_volatile: number;
  date_transactions: [Transaction];
}

export interface DataParsed {
  [token: string]: {
    balance: number;
    history: {
      [date: number]: TransactionByDate;
    };
  };
}
