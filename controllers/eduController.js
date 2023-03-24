const { Validate, Education } = require('../models/Education')

// Get Educations
const getEduController = async (req,res) => {
    try{
        const edu = await Education.find().sort('title')
        res.status(200).json({
            error: false,
            message: "Showing Educations!",
            date: edu
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

// Get Education By ID
const getEduByIdController = async (req,res) => {
    try{
        const edu = await Education.findById(req.params.id)
        res.status(200).json({
            error: false,
            message: "Showing Education!",
            date: edu
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

// Create Education
const createEduController = async (req,res) => {
    try{
        const { error } = Validate(req.body)
        if ( error ) return res.status(400).json({
            error: false,
            message: error.details[0].message
        })
        const edu = await Education({...req.body}).save()
        res.status(200).json({
            error: false,
            message: "Education information saved successfully!",
            date: edu
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

// Update Education
const updateEduController = async (req,res) => {
    try{
        const { error } = Validate(req.body)
        if( error ) return res.status(403).send(error.details[0].message)
        const edu = await Education.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
        res.status(200).json({
            error: false,
            message: "Education information updated successfully!",
            date: edu
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

// Delete Education
const deleteEduController = async (req,res) => {
    try{
        const edu = await Education.findByIdAndRemove(req.params.id)
        res.status(200).json({
            error: false,
            message: "Education information deleted successfully!",
            date: edu
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
    getEduController,
    getEduByIdController,
    createEduController,
    updateEduController,
    deleteEduController
}