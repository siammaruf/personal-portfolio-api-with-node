require('dotenv').config()
const mongoose = require('mongoose')
const dbName = process.env.DBNAME
const con = process.env.DBCON

mongoose.connect(`${con}/${dbName}`)
.then(()=>console.log('Connected to mongodb'))
.catch(err=>console.error('Could not connect to mongodb', err))

module.exports = mongoose