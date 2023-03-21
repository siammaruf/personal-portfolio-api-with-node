require('dotenv').config()
const express = require('express')
const app = express()
const Posts = require('./routes/postRoutes')
const Categories = require('./routes/categoryRoutes')
const Media = require('./routes/mediaRoutes')
const Projects = require('./routes/projectRoutes')
const Skills = require('./routes/skillRoutes')
const Educations = require('./routes/eduRoutes')
const mongoose = require('./config/database')

mongoose.Promise = global.Promise

app.use(express.json())
app.use(express.static(`${__dirname}/public`))
app.use(express.urlencoded({extended:false}))

app.use("/api/posts", Posts)
app.use("/api/categories", Categories)
app.use("/api/media", Media)
app.use("/api/projects", Projects)
app.use("/api/skills", Skills)
app.use("/api/educations", Educations)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Listing port ${PORT}`)
})