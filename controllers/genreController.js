const { Genre, Validate } = require('../models/Genre')

// Get Genre Api
const getGenreController = async ( req, res ) => {
    const genres = await Genre.find().sort('name')
    res.send(genres)
}

// Get Genre By ID
const getGenreByIdController = async ( req, res ) => {
    const genre  = await Genre.findById(req.params.id)
    if ( !genre ) return res.status(403).send('No Genre found with the ID !')
    res.send(genre)
}

// Create Genre
const createGenreController = async ( req, res ) => {
    const { error } = Validate(req.body)
    if ( error ) return res.status(400).send(error.details[0].message)
    try{
        const genre = Genre({
            name: req.body.name,
        })
        const result = await genre.save()
        res.send(result)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.error[field].message);
    }
}

// Update Genre
const updateGenreController = async ( req, res ) => {
    const { error } = Validate(req.body)
    if ( error ) return res.status(400).send(error.details[0].message)
    try{
        const genre = await Genre.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
        },{new:true})
        res.send(genre)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.error[field].message);
    }
}

// Delete Genre
const deleteGenreController = async ( req, res ) => {
    try{
        const result = await Genre.findByIdAndRemove({_id:req.params.id})
        res.send(result)
    }catch (ex) {
        for (let field in ex.errors)
            console.log(ex.error[field].message);
    }
}

module.exports = {
    getGenreByIdController,
    getGenreController,
    createGenreController,
    updateGenreController,
    deleteGenreController
}