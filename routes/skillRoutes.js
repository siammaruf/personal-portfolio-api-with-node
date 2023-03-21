const express = require('express')
const router = express.Router()
const {
    getSkillController,
    getSkillByIDController,
    createSkillController,
    updateSkillController, deleteSkillController
} = require('../controllers/skillController')

router.get("/",getSkillController)
router.get("/:id",getSkillByIDController)
router.post("/",createSkillController)
router.put("/:id",updateSkillController)
router.delete("/:id",deleteSkillController)

module.exports = router