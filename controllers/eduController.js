const { Validate, Education } = require('../models/Education')

// Get Educations
const getEduController = async (req,res) => {
    try{
        const edu = await Education.find().sort('title')
        res.send(edu)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

// Get Education By ID
const getEduByIdController = async (req,res) => {
    try{
        const edu = await Education.findById(req.params.id)
        res.send(edu)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

// Create Education
const createEduController = async (req,res) => {
    const { error } = Validate(req.body)
    if( error ) return res.status(403).send(error.details[0].message)
    try{
        const edu = Education({
            title: req.body.title,
            institute: req.body.institute,
            passingYear: req.body.passingYear
        })
        const saveEdu = await edu.save()
        res.send(saveEdu)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

// Update Education
const updateEduController = async (req,res) => {
    const { error } = Validate(req.body)
    if( error ) return res.status(403).send(error.details[0].message)
    try{
        const edu = await Education.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            institute: req.body.institute,
            passingYear: req.body.passingYear
        },{new:true})
        res.send(edu)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

// Delete Education
const deleteEduController = async (req,res) => {
    try{
        const edu = await Education.findByIdAndRemove(req.params.id)
        res.send(edu)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

module.exports = {
    getEduController,
    getEduByIdController,
    createEduController,
    updateEduController,
    deleteEduController
}