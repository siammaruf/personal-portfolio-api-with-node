const { Skill, Validate } = require('../models/Skill')

// Get Skills
const getSkillController = async (req, res) => {
    try{
        const skills = await Skill.find().sort('name')
        res.status(200).json({
            error: false,
            message: "Showing Skills!",
            date: skills
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

// Get Skill By ID
const getSkillByIDController = async (req, res) => {
    try{
        const skills = await Skill.findById(req.params.id)
        res.status(200).json({
            error: false,
            message: "Showing Skill!",
            date: skills
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

// Create Skill
const createSkillController = async (req, res) => {
    try{
        const { error } = Validate(req.body)
        if ( error ) return res.status(400).json({
            error: false,
            message: error.details[0].message
        })
        const skill = await Skill({...req.body}).save()
        res.status(200).json({
            error: false,
            message: "Skill saved successfully!",
            date: skill
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

// Update Skill
const updateSkillController = async (req,res) => {
    try {
        const { error } = Validate(req.body)
        if ( error ) return res.status(400).json({
            error: false,
            message: error.details[0].message
        })
        const skill = await Skill.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
        res.status(200).json({
            error: false,
            message: "Skill updated successfully!",
            date: skill
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

// Delete Skill
const deleteSkillController = async (req, res) => {
    try{
        const skill = await Skill.findByIdAndRemove(req.params.id)
        res.status(200).json({
            error: false,
            message: "Skill deleted successfully!",
            date: skill
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
    getSkillController,
    getSkillByIDController,
    createSkillController,
    updateSkillController,
    deleteSkillController
}