const express = require('express')
const router = express.Router()
const {
    getEduController,
    getEduByIdController,
    createEduController,
    updateEduController,
    deleteEduController
} = require('../controllers/eduController')

router.get("/", getEduController)
router.get("/:id", getEduByIdController)
router.post("/", createEduController)
router.put("/:id", updateEduController)
router.delete("/:id", deleteEduController)

module.exports = router