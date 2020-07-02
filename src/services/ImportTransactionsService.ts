import csvParse from "csv-parse";
import fs from "fs";

import { getCustomRepository } from "typeorm";
import CategoriesRepository from "../repositories/CategoriesRepository";
import TransactionsRepository from "../repositories/TransactionsRepository";
import CreateCategoryService from "./CreateCategoryService";
import Transaction from "../models/Transaction";
import Category from "../models/Category";

interface RequestCSV {
    title: string;

    type: "income" | "outcome";

    value: number;

    category: string;
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

const importTransactions = async (
    csvTransactions: RequestCSV[],
): Promise<Transaction[]> => {
    const transactions: Transaction[] = [];

    if (csvTransactions) {
        const transactionsRepository = getCustomRepository(
            TransactionsRepository,
        );
        let categories: Category[] = [];

        const categoriesNames = csvTransactions
            .map(transaction => transaction.category)
            .filter((value, index, self) => self.indexOf(value) === index);

        categories = [
            ...(await Promise.all(
                categoriesNames.map(async categoryName => {
                    return getCategory(categoryName);
                }),
            )),
        ];

        const createdTransactions = transactionsRepository.create(
            csvTransactions.map(transactionCSV => ({
                title: transactionCSV.title,
                type: transactionCSV.type,
                value: transactionCSV.value,
                category_id: categories.find(
                    cat => cat.title === transactionCSV.category,
                )?.id,
            })),
        );

        await transactionsRepository.save(createdTransactions);

        return createdTransactions;
    }

    return transactions;
};

class ImportTransactionsService {
    async execute(filePath: string): Promise<Transaction[]> {
        // TODO

        const csvTransactions: RequestCSV[] = [];

        const csvReadStream = fs.createReadStream(filePath);

        const streamParse = csvParse({
            from_line: 2,
        });

        const csvParsed = csvReadStream.pipe(streamParse);

        csvParsed.on("data", async line => {
            const [title, type, value, category] = line.map((cell: string) =>
                cell.trim(),
            );

            if (!title || !type || !value) return;

            csvTransactions.push({ title, type, value, category });
        });

        await new Promise(resolve => csvParsed.on("end", resolve));

        const transactionsToImport = await importTransactions(csvTransactions);

        await fs.promises.unlink(filePath);

        return transactionsToImport;
    }
}

export default ImportTransactionsService;
