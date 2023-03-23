const { Validate, Profile} = require('../models/Profile')
const { User} = require('../models/User')
const { Skill } = require('../models/Skill')
const { Education } = require('../models/Education')
const { Project } = require('../models/Project')

const profileCreateAndUpdate = async (req, res) =>{

    const { error } = Validate(req.body)
    if (error) return res.status(403).json({
        error: true,
        message: error.details[0].message
    })

    const user = await User.findOne({'_id':req.body.userId})
    if(!user) return res.status(400).json({
        error: true,
        message: "User not found with the user ID!"
    })

    const skillsId = typeof req.body.skillId === 'string' ? [req.body.skillId] : req.body.skillId
    const skills = await Skill
        .find({'_id': { $in: skillsId }})
        .select('_id name')

    // if (skills.length <= 0) return res.status(400).json({
    //     error: true,
    //     message: "Skills not found with those ID's!"
    // })

    const educationsId = typeof req.body.educationId === 'string' ? [req.body.educationId] : req.body.educationId
    const educations = await Education
        .find({'_id': { $in: educationsId }})
        .select('_id title')

    // if (educations.length <= 0) return res.status(400).json({
    //     error: true,
    //     message: "Educations not found with those ID's!"
    // })

    const projectsId = typeof req.body.projectId === 'string' ? [req.body.projectId] : req.body.projectId
    const projects = await Project
        .find({'_id': { $in: projectsId }})
        .select('_id title')

    // if (projects.length <= 0) return res.status(400).json({
    //     error: true,
    //     message: "Projects not found with those ID's!"
    // })

    return { skills, educations, projects, user }
}

// Get Profiles
const getProfileController = async (req, res) => {
    try{
        const profiles = await Profile().sort('title')
        res.status(200).join({
            error: false,
            message: "All profiles fetched successfully!",
            data: profiles
        })
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message)
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
}

// Get Profile By ID
const getProfileByUserIdController = async (req, res) => {
    try{
        const profile = await Profile.findOne({'user._id':req.params.userId})
        res.status(200).join({
            error: false,
            message: "The profile fetched successfully!",
            data: profile
        })
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message)
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
}

// Creat Profile
const createProfileController = async (req, res) => {
    try{
        const { skills, educations, projects, user } = await profileCreateAndUpdate(req, res)
        const { userId, skillId, educationId, projectId, ...bodyObj } = req.body
        const profileObj = {
            ...bodyObj,
            user: {
                _id: user._id,
                name: user.name
            },
            skills: skills,
            educations: educations,
            projects: projects
        }

        const profile = await Profile(profileObj).save();
        res.status(200).json({
            error: false,
            message: "Profile saved successfully!",
            data: profile
        })
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message)
        return res.status(500).json({
            error: true,
            message: "Internal Server Error!"
        })
    }
}

// Update Profile By ID
const updateProfileByIdController = async (req, res) => {
    try{
        const { skills, educations, projects, user } = await profileCreateAndUpdate(req, res)
        const { userId, skillId, educationId, projectId, ...bodyObj } = req.body
        const profileObj = {
            ...bodyObj,
            skills: skills,
            educations: educations,
            projects: projects
        }

        const profile = await Profile.findOneAndUpdate({'user._id':req.params.userId},profileObj,{new:true})
        res.status(200).json({
            error: false,
            message: "Profile saved successfully!",
            data: profile
        })
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message)
        return res.status(500).json({
            error: true,
            message: "Internal Server Error!"
        })
    }
}

// Delete Profile By ID
const deleteProfileByUserId = async (req, res) => {
    try{
        const profile = await Profile.findOneAndRemove({'user._id':req.params.userId})
        res.status(200).join({
            error: false,
            message: "profiles deleted successfully!",
            data: profile
        })
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.errors[field].message)
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
}

module.exports = {
    getProfileController,
    getProfileByUserIdController,
    createProfileController,
    updateProfileByIdController,
    deleteProfileByUserId
}