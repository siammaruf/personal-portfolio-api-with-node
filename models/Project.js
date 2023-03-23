const mongoose = require('mongoose')
const Joi = require('joi')
const { mediaSchema } = require('../models/Media')
const { categorySchema } = require('../models/Category')

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 250
    },
    descriptions:{
        type: String,
    },
    image: {
        type: mediaSchema,
        require: true
    },
    categories:{
        type: [categorySchema],
        require:true
    }
})

const project = mongoose.model('Project',projectSchema)
const fieldValidation = (project) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        descriptions: Joi.string(),
        imageId: Joi.string().required(),
        categoryId: Joi.array().required(),
    })
    return schema.validate(project)
}

module.exports = {
    Project: project,
    Validate: fieldValidation,
    projectSchema
}