const jwt = require('jsonwebtoken')
const { UserToken } = require('../models/Token')

const verifyRefreshToken = async (refreshToken) => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY
    const token = await UserToken.findOne({'token': refreshToken})

    return new Promise((resolve, reject) => {
        if (!token) return reject({
            error: true,
            message: "Invalid refresh token"
        });
        jwt.verify( refreshToken, privateKey, (err, tokenDetails) => {

            if (err) return reject({
                error: true,
                message:"Invalid refresh token"
            })

            resolve({
                tokenDetails,
                error: false,
                message:"Valid refresh token",
            })
        })
    })
}

module.exports = verifyRefreshToken