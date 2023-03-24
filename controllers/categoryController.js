const { Category, Validate } = require('../models/Category')

// Get Category Api
const getCategoryController = async ( req, res ) => {
    try{
        const category = await Category.find().sort('name')
        res.status(200).json({
            error: false,
            message: "Showing Categories!",
            date: category
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

// Get Category By ID
const getCategoryByIdController = async ( req, res ) => {
    try{
        const category  = await Category.findById(req.params.id)
        if ( !category ) return res.status(403).json({
            error:true,
            message: 'No Genre found with the ID !'
        })
        res.status(200).json({
            error: false,
            message: "Showing Category!",
            date: category
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

// Create Category
const createCategoryController = async ( req, res ) => {
    try{
        const { error } = Validate(req.body)
        if ( error ) return res.status(400).json({
            error: false,
            message: error.details[0].message
        })
        const category = await Category({...req.body}).save()
        res.status(200).json({
            error: false,
            message: "Category saved successfully!",
            date: category
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

// Update Category
const updateCategoryController = async ( req, res ) => {
    try{
        const { error } = Validate(req.body)
        if ( error ) return res.status(400).json({
            error: false,
            message: error.details[0].message
        })
        const category = await Category.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
        },{new:true})
        res.status(200).json({
            error: false,
            message: "Category updated successfully!",
            date: category
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

// Delete Category
const deleteCategoryController = async ( req, res ) => {
    try{
        const result = await Category.findByIdAndRemove({_id:req.params.id})
        res.status(200).json({
            error: false,
            message: "Category deleted successfully!",
            date: result
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
    getCategoryByIdController,
    getCategoryController,
    createCategoryController,
    updateCategoryController,
    deleteCategoryController
}