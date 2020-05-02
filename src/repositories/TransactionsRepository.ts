import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (sum: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income': {
            sum.income += transaction.value;
            sum.total += transaction.value;
            break;
          }
          case 'outcome': {
            sum.outcome += transaction.value;
            sum.total -= transaction.value;
            break;
          }
          default:
            break;
        }
        return sum;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
