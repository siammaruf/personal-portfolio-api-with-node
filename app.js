require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Posts = require('./routes/postRoutes')
const Categories = require('./routes/categoryRoutes')
const Media = require('./routes/mediaRoutes')
const Projects = require('./routes/projectRoutes')
const Skills = require('./routes/skillRoutes')
const Educations = require('./routes/eduRoutes')
const AuthRoutes = require('./routes/authRoutes')
const RefreshToken = require('./routes/refreshTokenRoutes')
const Profiles = require('./routes/profileRoutes')
const dbConnect = require('./config/database')
const corsOptions = require('./config/corsOptions')

// Connected to the Database
dbConnect()

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.static(`${__dirname}/public`))
app.use(express.urlencoded({extended:false}))

// Login Authorizations
app.use("/api", AuthRoutes)
app.use("/api/refreshtoken", RefreshToken)

app.use("/api/posts", Posts)
app.use("/api/categories", Categories)
app.use("/api/media", Media)
app.use("/api/projects", Projects)
app.use("/api/skills", Skills)
app.use("/api/educations", Educations)
app.use("/api/profiles", Profiles)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})