const express = require('express')
const {
    getCategoryController,
    getCategoryByIdController,
    createCategoryController,
    updateCategoryController,
    deleteCategoryController,
} = require("../controllers/categoryController");
const router = express.Router()
const auth = require('../middlewares/auth')

router.get("/", getCategoryController)
router.get("/:id", getCategoryByIdController)
router.post("/", auth, createCategoryController)
router.put("/:id", auth, updateCategoryController)
router.delete("/:id", auth, deleteCategoryController)

module.exports = router