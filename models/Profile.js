const mongoose = require('mongoose')
const Joi = require('joi')
const { userSchema } = require('./User')
const { skillSchema } = require('./Skill')
const { eduSchema } = require('./Education')
const { projectSchema } = require('./Project')

const profileSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        minLength: 5,
        maxLength: 150
    },
    objective:{
        type: String,
        minLength: 5,
        maxLength: 450
    },
    address:{
        type: String,
        minLength: 5,
        maxLength: 350
    },
    user: {
        type: userSchema,
        require: true,
    },
    skills:{
        type: [skillSchema]
    },
    educations:{
        type: [eduSchema]
    },
    projects:{
        type: [projectSchema]
    }
})

const profile = mongoose.model('Profile',profileSchema)
const fieldValidation = (profile) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(150).required().label('Title'),
        objective: Joi.string().min(5).max(450).label('Objective'),
        address: Joi.string().min(5).max(350).label('Address'),
        userId: Joi.string().required(),
        skillId: Joi.array(),
        educationId: Joi.array(),
        projectId: Joi.array(),
    })
    return schema.validate(profile)
}

module.exports = {
    Profile: profile,
    Validate: fieldValidation
}