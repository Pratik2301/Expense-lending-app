// routes/expenseRoutes.js
// Routes just map "URL + HTTP method" to a controller function.
import { Router } from "express";
import {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

const router = Router();

router.get("/", getAllExpenses);       // GET    /api/expenses
router.post("/", createExpense);       // POST   /api/expenses
router.put("/:id", updateExpense);     // PUT    /api/expenses/:id
router.delete("/:id", deleteExpense);  // DELETE /api/expenses/:id

export default router;
