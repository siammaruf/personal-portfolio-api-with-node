const express = require('express')
const router = express.Router()
const {
    createProfileController,
    deleteProfileByUserId,
    getProfileByUserIdController,
    getProfileController,
    updateProfileByIdController
} = require('../controllers/profileController')
const auth = require('../middlewares/auth')

router.get("/",getProfileController)
router.get("/:userId",deleteProfileByUserId)
router.use(auth)
router.post("/",createProfileController)
router.put("/:userId",updateProfileByIdController)
router.delete("/:userId", getProfileByUserIdController)

module.exports = router