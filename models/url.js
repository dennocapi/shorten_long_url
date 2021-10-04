const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    urlCode:String,
    longUrl:String,
    shortUrl:String
},{timestamps:true})

module.exports = mongoose.model('Url',urlSchema)