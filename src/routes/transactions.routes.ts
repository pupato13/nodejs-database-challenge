import { Router } from "express";

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get("/", async (request, response) => {
    // TODO
    return response.json({ message: "it's working!" });
});

transactionsRouter.post("/", async (request, response) => {
    // TODO
    return response.json({ message: "it's working!" });
});

transactionsRouter.delete("/:id", async (request, response) => {
    // TODO
    return response.json({ message: "it's working!" });
});

transactionsRouter.post("/import", async (request, response) => {
    // TODO
    return response.json({ message: "it's working!" });
});

export default transactionsRouter;
