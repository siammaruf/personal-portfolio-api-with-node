const express = require('express')
const {
    getCategoryController,
    getCategoryByIdController,
    createCategoryController,
    updateCategoryController,
    deleteCategoryController,
} = require("../controllers/categoryController");
const router = express.Router()

router.get("/", getCategoryController)
router.get("/:id", getCategoryByIdController)
router.post("/", createCategoryController)
router.put("/:id", updateCategoryController)
router.delete("/:id", deleteCategoryController)

module.exports = router