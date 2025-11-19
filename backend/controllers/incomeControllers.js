import User from "../models/User.js"
import Income from "../models/Income.js"
 
// Add Income source
export const addIncome = async (req, res) => {
    const userId = req.user.id

    try {
        const { icon, source, amount, date } = req.body

        // Validation - Check for missing fields
        if (!source || !amount || !date) {
            res.status(400).json({ message: "All fields are required!" })
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        })
        await newIncome.save()
        res.status(200).json(newIncome)
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

// Get All Income source
export const getAllIncome = async (req, res) => {
 
}


// Delete Income source
export const deleteIncome = async (req, res) => {
 
}


// Download Excel
export const downloadIncomeExcell = async (req, res) => {
 
}