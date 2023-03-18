const Joi = require('joi')
const Post = require('../models/PostModel')

// Get Post Api
const getPostController = async ( req, res ) => {
    const posts = await Post.find({})
    if( posts.length === 0 ) return res.status(403).send('Posts is empty !')
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
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        author: Joi.string().min(3).required(),
        tags: Joi.array().required(),
        isPublished: Joi.boolean().required()
    })
    const { error } = schema.validate(req.body)
    if ( error ) return res.status(400).send(error.details[0].message)
    const post = new Post({
        name: req.body.name,
        author: req.body.author,
        tags: req.body.tags,
        isPublished: req.body.isPublished,
    })
    const result = await post.save()
    res.send(result)
}

// Update post
const updatePostController = async ( req, res ) => {
    const schema = Joi.object({
        name: Joi.string().min(3),
        author: Joi.string().min(3),
        tags: Joi.array(),
        isPublished: Joi.boolean()
    })
    const { error } = schema.validate(req.body)
    if ( error ) return res.status(400).send(error.details[0].message)
    const post = await Post.findByIdAndUpdate(req.params.id,{
        $set:{
            name: req.body.name,
            author: req.body.author,
            tags: req.body.tags,
            isPublished: req.body.isPublished,
        }
    },{new:true})
    if ( !post ) return res.status(403).send('No post found with the ID !')
    res.send(post)
}

// Delete post
const deletePostController = async ( req, res ) => {
    const result = await Post.findByIdAndRemove({_id:req.params.id})
    if ( !result ) return res.status(403).send('No post found with the ID !')
    res.send(result)
}

module.exports = {
    getPostByIdController,
    getPostController,
    createPostController,
    updatePostController,
    deletePostController
}