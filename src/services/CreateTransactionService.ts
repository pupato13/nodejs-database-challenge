// import AppError from '../errors/AppError';

import { getCustomRepository } from "typeorm";

import Transaction from "../models/Transaction";
import TransactionsRepository from "../repositories/TransactionsRepository";

import AppError from "../errors/AppError";

interface Request {
    title: string;

    type: "income" | "outcome";

    value: number;

    category_id: string;
}

class CreateTransactionService {
    public async execute({
        title,
        type,
        value,
        category_id,
    }: Request): Promise<Transaction> {
        // TODO
        const transactionsRepository = getCustomRepository(
            TransactionsRepository,
        );

        if (
            type === "outcome" &&
            !(await transactionsRepository.hasSufficientFunds(value))
        ) {
            throw new AppError("Insufficient funds!");
        }

        const transaction = transactionsRepository.create({
            title,
            type,
            value,
            category_id,
        });

        await transactionsRepository.save(transaction);

        return transaction;
    }
}

export default CreateTransactionService;
