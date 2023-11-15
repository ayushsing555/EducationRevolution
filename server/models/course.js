const mongoose = require("mongoose");

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
        unique:false
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
    content: [contentSchema],
});

const sectionSchema = new mongoose.Schema({
    name: {
        type: String,
        default:"Asyuh"
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
});
courseStructure.index({ 'sections.Topic.name': 1 }, { unique: false });


const Course = mongoose.models.courses || mongoose.model("courses", courseStructure);
module.exports = Course;
