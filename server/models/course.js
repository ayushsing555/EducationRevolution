const mongoose = require("mongoose");
const contentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});
const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Enforce uniqueness within the context of the section
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
    content: [contentSchema]
});

const sectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Enforce uniqueness within the context of the course
    },
    Topics: {
        type: Number,
        default: 0,
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
    Topic: [topicSchema], // Include the topic sub-schema
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
    sections: [sectionSchema], // Include the section sub-schema
});

courseStructure.methods.addSection = function (sectionName) {
    console.log(this);
    this.sections = this.sections.concat({name: sectionName});
    this.save();
    return this;
};

const Course = mongoose.models.courses || mongoose.model("courses", courseStructure);
module.exports = Course;
