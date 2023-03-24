const { Post, Validate } = require('../models/Post')

// Get Post Api
const getPostController = async ( req, res ) => {
    try{
        const posts = await Post.find().sort('title')
        res.status(200).json({
            error: false,
            message: "Showing all posts!",
            date: posts
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

// Get Post By ID
const getPostByIdController = async ( req, res ) => {
    try{
        const post  = await Post.findById(req.params.id)
        if ( !post ) return res.status(403).json({
            error: false,
            message: 'No post found with the ID!'
        })
        res.status(200).json({
            error: false,
            message: "Showing the post!",
            date: post
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

// Create post
const createPostController = async ( req, res ) => {
    try{
        const { error } = Validate(req.body)
        if ( error ) return res.status(400).json({
            error: false,
            message: error.details[0].message
        })
        const post = await Post({...req.body}).save()
        res.status(200).json({
            error: false,
            message: "Post saved successfully!",
            date: post
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

// Update post
const updatePostController = async ( req, res ) => {
    try{
        const { error } = Validate(req.body)
        if ( error ) return res.status(400).json({
            error: false,
            message: error.details[0].message
        })
        const post = await Post.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
        res.status(200).json({
            error: false,
            message: "Post updated successfully!",
            date: post
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

// Delete post
const deletePostController = async ( req, res ) => {
    try{
        const result = await Post.findByIdAndRemove({_id:req.params.id})
        res.status(200).json({
            error: false,
            message: "Post deleted successfully!",
            date: result
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
    getPostByIdController,
    getPostController,
    createPostController,
    updatePostController,
    deletePostController
}