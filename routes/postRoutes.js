const express = require('express')
const router = express.Router()
const {
    getPostController,
    getPostByIdController,
    createPostController,
    updatePostController,
    deletePostController,
} = require("../controllers/postController");
const auth = require('../middlewares/auth')

router.get("/", getPostController)
router.get("/:id", getPostByIdController)
router.use(auth)
router.post("/", createPostController)
router.put("/:id", updatePostController)
router.delete("/:id", deletePostController)

module.exports = router