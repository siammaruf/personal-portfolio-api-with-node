const mongoose = require('mongoose')
const Joi = require('joi')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 250
    }
})

const category = mongoose.model('Category',categorySchema)
const fieldValidation = (category) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    })
    return schema.validate(category)
}

module.exports = {
    Category: category,
    Validate: fieldValidation,
    categorySchema
}