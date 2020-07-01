import { getRepository } from "typeorm";

import Transaction from "../models/Transaction";

import AppError from "../errors/AppError";

class DeleteTransactionService {
    public async execute(idTransaction: string): Promise<void> {
        const transactionsRepository = getRepository(Transaction);

        const transaction = await transactionsRepository.findOne(idTransaction);

        if (!transaction) {
            throw new AppError("Transaction not found!");
        }

        await transactionsRepository.delete(idTransaction);
    }
}

export default DeleteTransactionService;
