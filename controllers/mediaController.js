const { Media, Validate } = require('../models/Media')
const path = require('path')
const fs = require('fs')

// Get All Media
const getMediaController = async (req, res) => {
    try {
        const media = await Media.find().sort('name');
        res.status(200).json({
            error: false,
            message: "Showing Media Files!",
            date: media
        });
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.error[field].message);
        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
}

// Get Media By Id
const getMediaByIdController = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        res.status(200).json({
            error: false,
            message: "Showing Media File!",
            date: media
        });
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.error[field].message);
        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
}

// Save a media file
const createMediaController = async ( req, res ) => {
    try {
        const Obj = {
            name: path.parse(req.file.filename).name,
            path: `uploads/${req.file.filename}`,
            type: req.file.mimetype,
        }
        const { error } = Validate(Obj)
        if ( error ) return res.status(400).json({
            error: false,
            message: error.details[0].message
        })
        const media = await Media(Obj).save()
        res.status(200).json({
            error: false,
            message: "Media saved successfully!",
            date: media
        });
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.error[field].message);
        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
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
        res.status(200).json({
            error: false,
            message: "Media deleted successfully!",
            date: media
        });
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.error[field].message);
        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    getMediaController,
    getMediaByIdController,
    createMediaController,
    deleteMediaController
}