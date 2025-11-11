const express = require("express")
const router = express.Router()

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController")


router.get("/getUser", protect, getUserInfo)

router.post("/register", registerUser)

router.post("/login", loginUser)

module.exports = router