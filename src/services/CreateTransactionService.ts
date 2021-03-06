import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const transaction = new Transaction({ title, value, type });

    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Transaction type is invalid');
    }
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total - transaction.value < 0) {
      throw new Error('Transaction exceeds available balance');
    }

    this.transactionsRepository.create(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
