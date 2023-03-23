const express = require('express')
const router = express.Router()
const {
    createProjectController,
    getProjectController,
    getProjectByIdController,
    deleteProjectController
} = require('../controllers/projectController')
const auth = require('../middlewares/auth')

// Get Projects
router.get("/", getProjectController)
router.get("/:id", getProjectByIdController)
router.use(auth)
router.post("/", createProjectController)
router.delete("/:id", deleteProjectController)

module.exports = router