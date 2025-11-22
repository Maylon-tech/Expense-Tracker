import xlsx from "xlsx"
import Expense from "../models/Expense.js"
 
// Add Expense source
export const addExpense = async (req, res) => {
    const userId = req.user.id

    try {
        const { icon, category, amount, date } = req.body

        // Validation - Check for missing fields
        if (!category || !amount || !date) {
            res.status(400).json({ message: "All fields are required!" })
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        })
        await newExpense.save()
        res.status(200).json(newExpense)
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

// Get All Expense source
export const getAllExpense = async (req, res) => {
    const userId = req.user.id

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 })
        res.json(expense)
    } catch (error) {
        res.status(500).json({ message: " Server Error" })
    }
}

// Delete Expense source
export const deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id)
        res.json({ message: " Expense Deleted Successfully." })
    } catch (error) {
        res.status(500).json({ message: " Server Error" })
    }
}

// Download Excel
export const downloadExpenseExcell = async (req, res) => {
    const userId = req.user.id

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 })

        // Prepare date for Excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, "Expense")
        xlsx.writeFile(wb, 'expense.xlsx')
        res.download('expense.xlsx')

    } catch (error) {
        res.status(500).json({ message: " Server Error" })
    }
}