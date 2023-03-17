const Joi = require('joi')

const posts = [
    {id:1,name:'course 1'},
    {id:2,name:'course 2'},
    {id:3,name:'course 3'},
    {id:4,name:'course 4'},
    {id:5,name:'course 5'},
];

// Get Post Api
const getPostController = ( req, res ) => {
    if( posts.length === 0 ) return res.status(403).send('Posts is empty !')
    res.send(posts)
}

// Get Post By ID
const getPostByIdController = ( req, res ) => {
    const post  = posts.find(obj=>obj.id === parseInt(req.params.id))
    if ( !post ) return res.status(403).send('No post found with the ID !')
    res.send(post)
}

// Create post
const createPostController = ( req, res ) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    const { error } = schema.validate(req.body)
    if ( error ) return res.status(400).send(error.details[0].message)
    const post = { id: posts.length+1, name: req.body.name }
    posts.push(post)
    res.send(posts)
}

// Update post
const updatePostController = ( req, res ) => {
    const post  = posts.find(obj=>obj.id === parseInt(req.params.id))
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    const { error } = schema.validate(req.body)
    if ( !post ) return res.status(403).send('No post found with the ID !')
    if ( error ) return res.status(400).send(error.details[0].message)
    post.name = req.body.name
    res.send(post)
}

// Delete post
const deletePostController = ( req, res ) => {
    const post  = posts.find(obj=>obj.id === parseInt(req.params.id))
    if ( !post ) return res.status(403).send('No post found with the ID !')
    const index = posts.indexOf(post)
    posts.slice(index,1)
    res.send(posts)
}

module.exports = {
    getPostByIdController,
    getPostController,
    createPostController,
    updatePostController,
    deletePostController
}