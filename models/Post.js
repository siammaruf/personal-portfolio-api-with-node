const mongoose = require('mongoose')
const Joi = require('joi')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 50
    },
    content:{
        type: String,
        default: ''
    },
    author: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 50
    },
    tags:{
        type: Array,
        validate: {
            validator: function (v){
                return v && v.length > 0
            },
            message: 'The post should have at least one tag !'
        }
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    isPublished: {
        type: Boolean,
        default: false
    }
})

const post = mongoose.model('Post', postSchema)
const postValidator = (post) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        content: Joi.string(),
        author: Joi.string().min(3).required(),
        tags: Joi.array().required(),
        isPublished: Joi.boolean().required()
    })
    return schema.validate(post)
}

module.exports = {
    Post: post,
    Validate: postValidator
}