const { Post, Validate } = require('../models/Post')

// Get Post Api
const getPostController = async ( req, res ) => {
    const posts = await Post.find().sort('name')
    res.send(posts)
}

// Get Post By ID
const getPostByIdController = async ( req, res ) => {
    const post  = await Post.findById(req.params.id)
    if ( !post ) return res.status(403).send('No post found with the ID !')
    res.send(post)
}

// Create post
const createPostController = async ( req, res ) => {
    const { error } = Validate(req.body)
    if ( error ) return res.status(400).send(error.details[0].message)
    try{
        const post = Post({
            name: req.body.name,
            author: req.body.author,
            tags: req.body.tags,
            isPublished: req.body.isPublished,
        })
        const result = await post.save()
        res.send(result)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.error[field].message);
    }
}

// Update post
const updatePostController = async ( req, res ) => {
    const { error } = Validate(req.body)
    if ( error ) return res.status(400).send(error.details[0].message)
    try{
        const post = await Post.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            author: req.body.author,
            tags: req.body.tags,
            isPublished: req.body.isPublished,
        },{new:true})
        res.send(post)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.error[field].message);
    }
}

// Delete post
const deletePostController = async ( req, res ) => {
    try{
        const result = await Post.findByIdAndRemove({_id:req.params.id})
        res.send(result)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.error[field].message);
    }
}

module.exports = {
    getPostByIdController,
    getPostController,
    createPostController,
    updatePostController,
    deletePostController
}