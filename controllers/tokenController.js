const {UserToken} = require('../models/Token')
const jwt = require('jsonwebtoken')
const { refreshTokenBodyValidation } = require('../models/User')
const verifyRefreshToken = require('../config/verifyRefreshToken')

// Get New Access Token
const getAccessTokenController = async (req, res) => {
    const { error } = refreshTokenBodyValidation(req.body)
    if (error) return res.status(400).json({
        error: true,
        message: error.details[0].message
    })

    verifyRefreshToken(req.body.refreshToken)
        .then(({tokenDetails})=>{
            const payload = {_id: tokenDetails._id, email: tokenDetails.email}
            const accessToken = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_PRIVATE_KEY,
                { expiresIn: "14m" }
            )
            res.status(200).json({
                error: false,
                token: accessToken,
                message: "Access token created successfully !",
            });
        })
        .catch((err) => res.status(400).json(err))
}

// Logout
const logoutController = async (req, res) => {
    try{
        const { error } = refreshTokenBodyValidation(req.body)
        if (error) return res.status(400).json({
            error: true,
            message: error.details[0].message
        })

        const userToken = await UserToken.findOne({ token: req.body.refreshToken });
        if (!userToken) return res.status(200).json({
            error: false,
            message: "Logged Out Successfully !"
        })
        await UserToken.findOneAndRemove({ token: req.body.refreshToken });

        res.status(200).json({
            error: false,
            message: "Logged Out Successfully"
        });
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message)

        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    getAccessTokenController,
    logoutController
}