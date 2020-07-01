import { EntityRepository, Repository } from "typeorm";

import Transaction from "../models/Transaction";
import Balance from "../models/Balance";
import CalculateBalanceService from "../services/CalculateBalanceService";

interface CreateTransactionDTO {
    title: string;

    type: "income" | "outcome";

    value: number;

    category_id: string;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
    private transactions: Transaction[];

    private balance: Balance;

    constructor() {
        super();

        this.transactions = [];

        this.balance = new Balance();
    }

    public async all(): Promise<Transaction[]> {
        this.transactions = await this.find();

        return this.transactions;
    }

    public async getBalance(): Promise<Balance> {
        const transactions = await this.all();

        const calculateBalanceService = new CalculateBalanceService(
            transactions,
        );

        const balance = await calculateBalanceService.execute();

        return balance;
    }

    public async hasSufficientFunds(value: number): Promise<boolean> {
        const balance = await this.getBalance();

        return balance.total >= value;
    }
}

export default TransactionsRepository;
