const mongoose = require('mongoose')
const { userSchema } = require('./User')

const tokenSchema = new mongoose.Schema({
    userId:{
        type: userSchema,
        require: true
    },
    token:{
        type: String,
        require: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expire: 30 * 86400
    }
})

const token = mongoose.model("UserToken", tokenSchema)

module.exports = {
    UserToken: token
}