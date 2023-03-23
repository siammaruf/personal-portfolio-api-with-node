const express = require('express')
const router = express.Router()
const { Storage } = require('../models/Media')

const {
    getMediaController,
    createMediaController,
    deleteMediaController,
    getMediaByIdController
} = require('../controllers/mediaController')
const auth = require('../middlewares/auth')

router.get("/", getMediaController)
router.get("/:id", getMediaByIdController)
router.use(auth)
router.post("/", Storage.single('file'), createMediaController)
router.delete("/:id", deleteMediaController)

module.exports = router