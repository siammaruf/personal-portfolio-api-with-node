const { Skill, Validate } = require('../models/Skill')

// Get Skills
const getSkillController = async (req, res) => {
    try{
        const skills = await Skill.find().sort('name')
        res.send(skills)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

// Get Skill By ID
const getSkillByIDController = async (req, res) => {
    try{
        const skills = await Skill.findById(req.params.id)
        res.send(skills)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

// Create Skill
const createSkillController = async (req, res) => {
    const { error } = Validate(req.body)
    if( error ) return res.status(403).send(error.details[0].message)
    try{
        const skill = Skill({
            name: req.body.name,
            experienceYears: parseInt(req.body.experienceYears),
            experienceLevels: parseInt(req.body.experienceLevels),
        })
        const saveSkill = await skill.save()
        res.send(saveSkill)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

// Update Skill
const updateSkillController = async (req,res) => {
    const { error } = Validate(req.body)
    if( error ) return res.status(403).send(error.details[0].message)
    try {
        const skill = await Skill.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            experienceYears: parseInt(req.body.experienceYears),
            experienceLevels: parseInt(req.body.experienceLevels),
        },{new:true})
        res.send(skill)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

// Delete Skill
const deleteSkillController = async (req, res) => {
    try{
        const skills = await Skill.findByIdAndRemove(req.params.id)
        res.send(skills)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

module.exports = {
    getSkillController,
    getSkillByIDController,
    createSkillController,
    updateSkillController,
    deleteSkillController
}