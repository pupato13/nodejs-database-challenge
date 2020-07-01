import { Router } from "express";
import { getCustomRepository } from "typeorm";

import TransactionsRepository from "../repositories/TransactionsRepository";
import CategoriesRepository from "../repositories/CategoriesRepository";
import CreateTransactionService from "../services/CreateTransactionService";
import DeleteTransactionService from "../services/DeleteTransactionService";
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get("/", async (request, response) => {
    // TODO

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactions = await transactionsRepository.all();
    const balance = await transactionsRepository.getBalance();

    return response.json({ transactions, balance });
});

transactionsRouter.post("/", async (request, response) => {
    // TODO
    const { title, type, value, category } = request.body;
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const existingCategory = await categoriesRepository.getCategoryByTitle(
        category,
    );

    let category_id = "";

    // if (!category) {
    if (!existingCategory) {
        const newCategory = categoriesRepository.create({
            title: category,
        });

        await categoriesRepository.save(newCategory);

        category_id = newCategory.id;
    } else {
        category_id = existingCategory.id;
    }

    const createTransactionService = new CreateTransactionService();

    const transaction = await createTransactionService.execute({
        title,
        type,
        value,
        category_id,
    });

    return response.json(transaction);
});

transactionsRouter.delete("/:id", async (request, response) => {
    // TODO
    const deleteTransactionService = new DeleteTransactionService();

    await deleteTransactionService.execute(request.params.id);

    return response.json({ message: "Bye bye, Transaction!" });
});

transactionsRouter.post("/import", async (request, response) => {
    // TODO
    return response.json({ message: "it's working!" });
});

export default transactionsRouter;
