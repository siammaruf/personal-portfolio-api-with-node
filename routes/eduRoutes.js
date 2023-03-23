const express = require('express')
const router = express.Router()
const {
    getEduController,
    getEduByIdController,
    createEduController,
    updateEduController,
    deleteEduController
} = require('../controllers/eduController')
const auth = require('../middlewares/auth')

router.get("/", getEduController)
router.get("/:id", getEduByIdController)
router.post("/", auth, createEduController)
router.put("/:id", auth, updateEduController)
router.delete("/:id", auth, deleteEduController)

module.exports = router