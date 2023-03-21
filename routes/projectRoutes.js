const express = require('express')
const router = express.Router()
const {
    createProjectController,
    getProjectController,
    getProjectByIdController,
    deleteProjectController
} = require('../controllers/projectController')

// Get Projects
router.get("/", getProjectController)
router.get("/:id", getProjectByIdController)
router.post("/", createProjectController)
router.delete("/:id", deleteProjectController)

module.exports = router