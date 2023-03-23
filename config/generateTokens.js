const jwt = require('jsonwebtoken')
const { UserToken } = require('../models/Token')

const generateTokens = async (user) => {
    try{
        const payload = {_id: user._id, email: user.email}

        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
            { expiresIn: "14m" }
        )

        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVATE_KEY,
            { expiresIn: "30d" }
        )

        await UserToken.findOneAndRemove({ userId: user._id })
        await UserToken({ userId: user._id, token: refreshToken }).save()
        return Promise.resolve({ accessToken, refreshToken})

    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message)
        return Promise.reject(ex)
    }
}

module.exports = generateTokens