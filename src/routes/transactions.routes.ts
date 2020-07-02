import { Router } from "express";
import { getCustomRepository } from "typeorm";
import multer from "multer";
import uploadConfig from "../config/upload";

import TransactionsRepository from "../repositories/TransactionsRepository";
import CreateTransactionService from "../services/CreateTransactionService";
import DeleteTransactionService from "../services/DeleteTransactionService";
import ImportTransactionsService from "../services/ImportTransactionsService";

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get("/", async (request, response) => {
    // TODO

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactions = await transactionsRepository.all();
    const balance = await transactionsRepository.getBalance();

    return response.json({ transactions, balance });
});

transactionsRouter.post("/", async (request, response) => {
    // TODO
    const createTransactionService = new CreateTransactionService();

    const { title, type, value, category } = request.body;

    const transaction = await createTransactionService.execute({
        title,
        type,
        value,
        category_name: category,
    });

    return response.json(transaction);
});

transactionsRouter.delete("/:id", async (request, response) => {
    // TODO
    const deleteTransactionService = new DeleteTransactionService();

    await deleteTransactionService.execute(request.params.id);

    return response.json({ message: "Bye bye, Transaction!" });
});

transactionsRouter.post(
    "/import",
    upload.single("file"),
    async (request, response) => {
        // TODO

        const importTransactionsService = new ImportTransactionsService();
        const transactions = await importTransactionsService.execute(
            request.file.path,
        );

        return response.json(transactions);
    },
);

export default transactionsRouter;
