const mongoose = require("mongoose");
const SectionStructure = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    Topics:{
        type:Number,
        default:0
    },
    createdDate:{
        type:Date,
        default:Date.now()
    },
    courseName:{
        type:String,
        required:true,
    }
})
const Section = mongoose.models.Sections||mongoose.model("Sections",SectionStructure);
module.exports = Section;