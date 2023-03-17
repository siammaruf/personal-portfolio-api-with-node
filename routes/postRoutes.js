const express = require('express')
const {
    getPostController,
    getPostByIdController,
    createPostController,
    updatePostController,
    deletePostController,
} = require("../controllers/postController");
const router = express.Router()

router.get("/", getPostController)
router.get("/:id", getPostByIdController)
router.post("/", createPostController)
router.put("/:id", updatePostController)
router.delete("/:id", deletePostController)

module.exports = router