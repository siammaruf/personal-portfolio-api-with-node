const { Category, Validate } = require('../models/Category')

// Get Category Api
const getCategoryController = async ( req, res ) => {
    try{
        const category = await Category.find().sort('name')
        res.send(category)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

// Get Category By ID
const getCategoryByIdController = async ( req, res ) => {
    const category  = await Category.findById(req.params.id)
    if ( !category ) return res.status(403).send('No Genre found with the ID !')
    res.send(category)
}

// Create Category
const createCategoryController = async ( req, res ) => {
    const { error } = Validate(req.body)
    if ( error ) return res.status(400).send(error.details[0].message)
    try{
        const category = Category({
            name: req.body.name,
        })
        const result = await category.save()
        res.send(result)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

// Update Category
const updateCategoryController = async ( req, res ) => {
    const { error } = Validate(req.body)
    if ( error ) return res.status(400).send(error.details[0].message)
    try{
        const category = await Category.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
        },{new:true})
        res.send(category)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

// Delete Category
const deleteCategoryController = async ( req, res ) => {
    try{
        const result = await Category.findByIdAndRemove({_id:req.params.id})
        res.send(result)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

module.exports = {
    getCategoryByIdController,
    getCategoryController,
    createCategoryController,
    updateCategoryController,
    deleteCategoryController
}