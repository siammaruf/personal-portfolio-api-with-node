const express = require('express')
const router = express.Router()
const {
    getSkillController,
    getSkillByIDController,
    createSkillController,
    updateSkillController, deleteSkillController
} = require('../controllers/skillController')
const auth = require('../middlewares/auth')

router.get("/",getSkillController)
router.get("/:id",getSkillByIDController)
router.use(auth)
router.post("/",createSkillController)
router.put("/:id",updateSkillController)
router.delete("/:id",deleteSkillController)

module.exports = router