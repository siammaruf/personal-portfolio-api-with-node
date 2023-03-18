const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags:[String],
    date: {
        type: Date,
        default: Date.now()
    },
    isPublished: Boolean
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post