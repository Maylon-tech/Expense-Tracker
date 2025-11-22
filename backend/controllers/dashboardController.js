import Income from "../models/Income"
import Expense from "../models/Expense"
import { isValidObjectId, Types } from "mongoose"

// Dashboard Data
export const getDashboardData = async (req, res) => {
    
    try {
        const userId = req.user.id
        const userObjectId = new Types.ObejctId(String(userId))

        // Fetch total income & expenses
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectid } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ])

        console.log("TotalIncome",{ totalIncome, userId } )
    } catch (error) {
        
    }
}