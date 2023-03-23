const mongoose = require('mongoose')
const Joi = require('joi')

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 250
    },
    experienceYears:{
        type: Number,
        minLength: 1,
        maxLength: 3,
        require: true,
    },
    experienceLevels:{
        type: Number,
        minLength: 1,
        maxLength: 3,
        require: true,
    }
})

const skill = mongoose.model('Skill',skillSchema)
const fieldValidation = (skill) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        experienceYears: Joi.number().min(1).required(),
        experienceLevels: Joi.number().min(1).required(),
    })
    return schema.validate(skill)
}

module.exports = {
    Skill: skill,
    Validate: fieldValidation,
    skillSchema
}