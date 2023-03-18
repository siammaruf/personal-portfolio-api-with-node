require('dotenv').config()
const express = require('express')
const app = express()
const Posts = require('./routes/postRoutes')
const mongoose = require('./config/database')

mongoose.Promise = global.Promise

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/posts", Posts)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Listing port ${PORT}`)
})