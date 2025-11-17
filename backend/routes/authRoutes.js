import express from "express"
const router = express.Router()
import {protect} from '../middleware/authMiddleware.js'

import {
    registerUser,
    loginUser,
    getUserInfo,
} from "../controllers/authController.js"


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/getUser", protect, getUserInfo)
router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Not file uploaded." })
    }
})

export default router