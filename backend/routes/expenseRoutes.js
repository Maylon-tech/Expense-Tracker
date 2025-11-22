import express from 'express'
import {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcell
} from '../controllers/expenseControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const expenseRouter = express.Router()

expenseRouter.post("/add", protect, addExpense)
expenseRouter.get("/get", protect, getAllExpense)
expenseRouter.delete("/:id", protect, deleteExpense)
expenseRouter.get("/downloadexcel", protect, downloadExpenseExcell)


export default expenseRouter