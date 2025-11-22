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
incomeRouter.delete("/:id", protect, deleteIncome)
incomeRouter.get("/downloadexcel", protect, downloadIncomeExcell)


export default incomeRouter