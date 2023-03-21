const mongoose = require('mongoose')
const Joi = require('joi')
const multer = require('multer')
const path = require('path')

const mediaSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    path:{
        type: String,
        require: true,
    },
    type:{
        type: String,
        require: true
    }
})

const mediaModel = mongoose.model('Media',mediaSchema)
const validator = ( media ) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        path: Joi.string().required(),
        type: Joi.string().required()
    })
    return schema.validate(media)
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        const ext = path.parse(file.originalname).ext;
        const fileName = path.parse(file.originalname).name;
        cb(null, `${fileName}-${Date.now()+ext}`)
    }
})
const upload = multer({
    storage: storage
})

module.exports = {
    Media: mediaModel,
    Validate: validator,
    Storage: upload,
    mediaSchema
}