const express = require('express')
const router = express.Router()
const {
    getAccessTokenController,
    logoutController
} = require('../controllers/tokenController')

router.post("/", getAccessTokenController)
router.delete("/", logoutController)

module.exports = router