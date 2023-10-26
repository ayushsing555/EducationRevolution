const mongoose = require("mongoose");
const courseStructure = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    id:{
        type:String,
        unique:true,
        required:true
    },
    sections:{
        type:Number,
        default:0
    },
    createdDate:{
        type:Date,
        default:Date.now()
    }
})
const Course = mongoose.models.courses||mongoose.model("courses",courseStructure);
module.exports = Course;