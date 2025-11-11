require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")

const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")


// import express from 'express'
// import cors from 'cors'
// import path from 'path'
// import connectDB from './config/db.js'

const app = express()

// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
)

app.use(express.json())

connectDB()
app.use("/api/v1/auth", authRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("server is running on PORT", PORT))