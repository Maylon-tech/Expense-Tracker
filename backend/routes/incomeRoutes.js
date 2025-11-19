import express from 'express'
import {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcell
} from '../controllers/incomeControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const incomeRouter = express.Router()

incomeRouter.post("/add", protect, addIncome)
incomeRouter.get("/get", protect, getAllIncome)
incomeRouter.get("/downloadexcel", protect, downloadIncomeExcell)
incomeRouter.delete("/:id", protect, deleteIncome)


export default incomeRouter