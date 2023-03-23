const { Validate, LoginValidation, User } = require('../models/User')
const bcrypt = require('bcrypt')
const generateTokens = require('../config/generateTokens')

// Api For Signup
const authSignUpController = async (req, res) => {
    const { error } = Validate(req.body)
    if (error) return res.status(400).json({
        error: true,
        message: error.details[0].message
    })
    try{
        const findBy = [
            {'username':req.body.username},
            {'email':req.body.email},
            {'mobile':req.body.mobile},
        ]
        const findUser = await User.findOne({$or:findBy})

        if (findUser) return res.status(400).json({
            error: true,
            message: 'User with given credentials already exist!'
        })

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPass = await bcrypt.hash(req.body.password, salt)
        const user = await User({...req.body, password:hashPass}).save()

        res.status(201).json({
            error: false,
            message: "Account created successfully!",
            data: user
        })
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message)

        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
}

// Api For Login
const authLoginController = async (req, res) => {
    try{
        const { error } = LoginValidation(req.body)
        if (error) return res.status(400).json({
            error: true,
            message: error.details[0].message
        })

        // Check Username or Email
        const findBy = [
            {'username':req.body.username},
            {'email':req.body.email},
            {'mobile':req.body.mobile},
        ]
        const findUser = await User.findOne({$or:findBy})
        if (!findUser) return res.status(400).json({
            error: true,
            message: 'Invalid email/username or password !'
        })


        // Check Password
        const verifyPass = await bcrypt.compare(req.body.password, findUser.password)
        if (!verifyPass) return res.status(401).json({
            error: true,
            message: 'Invalid email/username or password !'
        })

        const { accessToken, refreshToken } = await generateTokens(findUser)

        res.status(200).json({
            error:false,
            accessToken,
            refreshToken,
            message: "Logged in Successfully"
        })
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
    authSignUpController,
    authLoginController
}