import Transaction from "../models/Transaction";
import Balance from "../models/Balance";

class CalculateBalanceService {
    private transactions: Transaction[];

    constructor(transactions: Transaction[]) {
        this.transactions = transactions;
    }

    public execute(): Balance {
        const balance = new Balance();

        const incomeTransactions = this.transactions.filter(
            transaction => transaction.type === "income",
        );
        const outcomeTransactions = this.transactions.filter(
            transaction => transaction.type === "outcome",
        );

        incomeTransactions.map(transaction =>
            balance.setIncome(transaction.value),
        );
        outcomeTransactions.map(transaction =>
            balance.setOutcome(transaction.value),
        );

        balance.calculateBalance();

        return balance;
    }
}

export default CalculateBalanceService;
