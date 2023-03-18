const express = require('express')
const router = express.Router()
const {
    getGenreController,
    getGenreByIdController,
    createGenreController,
    updateGenreController,
    deleteGenreController
} = require("../controllers/genreController");

router.get("/", getGenreController)
router.get("/:id", getGenreByIdController)
router.post("/", createGenreController)
router.put("/:id", updateGenreController)
router.delete("/:id", deleteGenreController)

module.exports = router