const express = require('express')
const app = express()
const Posts = require('./routes/postRoutes')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/posts", Posts)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Listing port ${PORT}`)
})