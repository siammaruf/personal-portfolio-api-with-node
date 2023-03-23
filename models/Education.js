const mongoose = require('mongoose')
const Joi = require('joi')

const eduSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 250
    },
    institute:{
        type: String,
        require: true,
        minLength: 3,
        maxLength: 250
    },
    passingYear:{
        type: Number,
        maxLength: 4,
        require: true,
    }
})

const edu = mongoose.model('Education',eduSchema)
const fieldValidation = (edu) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(250).required(),
        institute: Joi.string().min(4).required(),
        passingYear: Joi.number().min(4).required(),
    })
    return schema.validate(edu)
}

module.exports = {
    Education: edu,
    Validate: fieldValidation,
    eduSchema
}