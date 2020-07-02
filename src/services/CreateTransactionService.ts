import { getCustomRepository } from "typeorm";
import CategoriesRepository from "../repositories/CategoriesRepository";
import TransactionsRepository from "../repositories/TransactionsRepository";
import CreateCategoryService from "./CreateCategoryService";

import Transaction from "../models/Transaction";
import Category from "../models/Category";

import AppError from "../errors/AppError";

interface Request {
    title: string;

    type: "income" | "outcome";

    value: number;

    category_name: string;
}

const getCategory = async (category_name: string): Promise<Category> => {
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const existingCategory = await categoriesRepository.getCategoryByTitle(
        category_name,
    );

    if (!existingCategory) {
        const createCategoryService = new CreateCategoryService();

        return createCategoryService.execute({ title: category_name });
    }

    return existingCategory;
};

class CreateTransactionService {
    public async execute({
        title,
        type,
        value,
        category_name,
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

        const category = await getCategory(category_name);

        const transaction = transactionsRepository.create({
            title,
            type,
            value,
            category_id: category.id,
        });

        await transactionsRepository.save(transaction);

        return transaction;
    }
}

export default CreateTransactionService;
