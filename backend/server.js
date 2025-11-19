import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import connectDB from './config/db.js'

import authRoutes from "./routes/authRoutes.js"
import incomeRoutes from "./routes/incomeRoutes.js"

const app = express()
dotenv.config()

// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
)

connectDB()
app.use(express.json())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/income", incomeRoutes)

// Server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads" )))


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("server is running on PORT", PORT))