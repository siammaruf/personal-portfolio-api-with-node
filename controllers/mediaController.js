const { Media, Validate } = require('../models/Media')
const path = require('path')
const fs = require('fs')

// Get All Media
const getMediaController = async (req, res) => {
    try {
        const media = await Media.find().sort('name');
        res.send(media)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.error[field].message);
    }
}

// Get Media By Id
const getMediaByIdController = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        res.send(media)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.error[field].message);
    }
}

// Save a media file
const createMediaController = async ( req, res ) => {
    const Obj = {
        name: path.parse(req.file.filename).name,
        path: `uploads/${req.file.filename}`,
        type: req.file.mimetype,
    }
    const { error } = Validate(Obj)
    if( error ) return res.status(403).send(error.details[0].message)
    try {
        const media = Media(Obj)
        const saveMedia = await media.save()
        res.send(saveMedia)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.error[field].message);
    }
}

// Delete a media file
const deleteMediaController = async (req,res) => {
    try{
        const media = await Media.findByIdAndRemove(req.params.id)
        const filePath = `./public/${media.path}`
        fs.unlink(filePath,(error)=>{
            if (error) throw error
        })
        res.send(media)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.error[field].message);
    }
}

module.exports = {
    getMediaController,
    getMediaByIdController,
    createMediaController,
    deleteMediaController
}