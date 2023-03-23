require('dotenv').config()
const mongoose = require('mongoose')
const dbName = process.env.DBNAME
const con = process.env.DBCON

const dbConnect = () => {
    const conParams = { useNewUrlParser: true }
    mongoose.connect(`${con}/${dbName}`,conParams)

    mongoose.connection.on("connected", () => {
        console.log("Connected to the database successfully !");
    })

    mongoose.connection.on("error", (err) => {
        console.error("Error while connecting to the database !",err);
    })

    mongoose.connection.on("disconnected", () => {
        console.log("Mongodb connection disconnected !");
    })
}

module.exports = dbConnect