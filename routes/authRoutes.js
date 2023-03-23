const express = require('express')
const router = express.Router()
const {
    authLoginController,
    authSignUpController
} = require('../controllers/authController')

router.post("/signup",authSignUpController)
router.post("/login", authLoginController)

module.exports = router