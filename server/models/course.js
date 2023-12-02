const mongoose = require("mongoose");

const QuizQuesStructure = new mongoose.Schema({
    questionName: String,
    options: [String],
    answer: String,
    imageUrl :String
});

const QuizSchema = new mongoose.Schema({
        QuizId:{
            type:String,
            unique:true,
            required:true
        },
        QuizName:{
            type:String,
            unique:true,
            required:true
        },
        QuizSet:[QuizQuesStructure],
});
const contentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
    content: [contentSchema],
    Quizes:[QuizSchema]
});

const sectionSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Asyuh"
    },
    Topics: {
        type: Number,
        default: 0,
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
    Topic: [topicSchema],
    Quizes:[QuizSchema]
});

const courseStructure = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    id: {
        type: String,
        unique: true,
        required: true,
    },
    totalSections: {
        type: Number,
        default: 0,
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
    sections: [sectionSchema],
    Quizes:[QuizSchema]
});
courseStructure.index({'sections.Topic.name': 1}, {unique: false});


const Course = mongoose.models.courses || mongoose.model("courses", courseStructure);
module.exports = Course;
