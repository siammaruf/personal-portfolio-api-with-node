const { Project , Validate } = require('../models/Project')
const { Media } = require('../models/Media')
const { Category } = require('../models/Category')

// Get Projects
const getProjectController = async (req, res) => {
    try{
        const project = await Project.find().sort('title')
        res.status(200).json({
            error: false,
            message: "Showing projects!",
            date: project
        });
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
}

// Get Project By ID
const getProjectByIdController = async (req, res) => {
    try{
        const project = await Project.findById(req.params.id)
        res.status(200).json({
            error: false,
            message: "Showing project!",
            date: project
        });
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
}

// Create Project
const createProjectController = async (req, res) => {
    try{
        const { error } = Validate(req.body)
        if ( error ) return res.status(400).json({
            error: false,
            message: error.details[0].message
        })

        const image = await Media.findById(req.body.imageId)
        if (!image) return res.status(400).json({
            error: false,
            message: "Invalid image!"
        })

        const categories = await Category
            .find({'_id':{ $in: req.body.categoryId}})
            .select('_id name');

        if (categories.length <= 0) return res.status(400).json({
            error: false,
            message: "Invalid category!"
        })
        const project = await Project({
            title: req.body.title,
            descriptions: req.body.descriptions,
            image:{
                _id: image._id,
                name: image.name,
                path: image.path
            },
            categories: categories,
        }).save()
        res.status(200).json({
            error: false,
            message: "Project saved successfully!",
            date: project
        });
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
}

// Delete Project By ID
const deleteProjectController = async (req, res) => {
    try{
        const project = await Project.findByIdAndRemove(req.params.id)
        res.status(200).json({
            error: false,
            message: "Project deleted successfully!",
            date: project
        });
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    getProjectController,
    getProjectByIdController,
    createProjectController,
    deleteProjectController
}