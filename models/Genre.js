const mongoose = require('mongoose')
const Joi = require('joi')

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 50
    }
})

const genre = mongoose.model('Genre',genreSchema)
const genreValidation = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    })
    return schema.validate(genre)
}

module.exports = {
    Genre: genre,
    Validate: genreValidation
}