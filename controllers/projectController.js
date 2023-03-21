const { Project , Validate } = require('../models/Project')
const { Media } = require('../models/Media')
const { Category } = require('../models/Category')

// Get Projects
const getProjectController = async (req, res) => {
    try{
        const project = await Project.find().sort('title')
        res.send(project)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

// Get Project By ID
const getProjectByIdController = async (req, res) => {
    try{
        const project = await Project.findById(req.params.id)
        res.send(project)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

// Create Project
const createProjectController = async (req, res) => {
    const { error } = Validate(req.body)
    if ( error ) return res.status(403).send(error.details[0].message)

    const image = await Media.findById(req.body.imageId)
    if (!image) return res.status(400).send('Invalid image!')

    const categories = await Category
        .find({'_id':{ $in: req.body.categoryId}})
        .select('_id name');

    if (!categories) return res.status(400).send('Invalid category!')

    try{
        const project = Project({
            title: req.body.title,
            descriptions: req.body.descriptions,
            image:{
                _id: image._id,
                name: image.name,
                path: image.path
            },
            categories: categories,
        })
        const saveProject = await project.save()
        res.send(saveProject)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

// Delete Project By ID
const deleteProjectController = async (req, res) => {
    try{
        const project = await Project.findByIdAndRemove(req.params.id)
        res.send(project)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

module.exports = {
    getProjectController,
    getProjectByIdController,
    createProjectController,
    deleteProjectController
}