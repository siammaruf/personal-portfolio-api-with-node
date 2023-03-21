const express = require('express')
const router = express.Router()
const { Storage } = require('../models/Media')

const {
    getMediaController,
    createMediaController,
    deleteMediaController,
    getMediaByIdController
} = require('../controllers/mediaController')

router.get("/", getMediaController)
router.get("/:id", getMediaByIdController)
router.post("/", Storage.single('file'), createMediaController)
router.delete("/:id", deleteMediaController)

module.exports = router