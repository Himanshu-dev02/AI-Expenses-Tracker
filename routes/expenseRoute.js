import e from "express";
import middleware from "../middleware/auth.js";
import { addExpense, getAllExpense, updateExpense, downloadExpenseExcel, deleteExpense, getExpenseOverview } from "../controllers/expenseController.js";

const expenseRouter = e.Router();


expenseRouter.post("/add", authMiddleware, addExpense);
expenseRouter.get("/get", authMiddleware, getAllExpenses);

expenseRouter.put("/update/:id", authMiddleware, updateExpense);
expenseRouter.get("/downloadexcel", authMiddleware, downloadExpenseExcel);

expenseRouter.delete("/delete/:id", authMiddleware, deleteExpense);
expenseRouter.get("/overview", authMiddleware, getExpenseOverview);

export default expenseRouter;