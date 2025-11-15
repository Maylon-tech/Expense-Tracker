import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import cors from 'cors'
import connectDB from './config/db.js'

import authRoutes from "./routes/authRoutes.js"

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

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("server is running on PORT", PORT))