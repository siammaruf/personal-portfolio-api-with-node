const mongoose = require('mongoose')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 150
    },
    username:{
        type: String,
        require: true,
        minLength: 5,
        maxLength: 150,
        unique:true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        require: true,
    },
    mobile:{
        type: Number,
        unique: true,
        maxLength: 20,
        require: true,
    },
    password:{
        type: String,
        require: true,
    }
})

const user = mongoose.model('User',userSchema)

const fieldValidation = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(150).required().label("Name"),
        username: Joi.string().min(5).max(150).required().label("User Name"),
        email: Joi.string().required().label("Email"),
        mobile: Joi.number().required().label("Mobile"),
        password: passwordComplexity().required().label("Password")
    })
    return schema.validate(user)
}

const loginValidation = (login) => {
    const schema = Joi.object({
        username: Joi.string().required().label("User Name"),
        password: Joi.string().required().label("Password")
    })
    return schema.validate(login)
}

const refreshTokenBodyValidation = (token) => {
    const schema = Joi.object({
        refreshToken: Joi.string().required().label("Refresh Token"),
    });
    return schema.validate(token);
}

module.exports = {
    User: user,
    Validate: fieldValidation,
    LoginValidation: loginValidation,
    refreshTokenBodyValidation,
    userSchema
}