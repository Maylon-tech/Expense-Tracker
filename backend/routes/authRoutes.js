import express from "express"
const router = express.Router()

import {
    registerUser,
    loginUser,
    getUserInfo,
} from "../controllers/authController.js"



router.post("/register", registerUser)

router.post("/login", loginUser)

// router.get("/getUser", protect, getUserInfo)

export default router