const mongoose = require("mongoose");

const subtopicContentStructure = new mongoose.Schema({
    
            SubtopicName: {
                type: String,
                required: true
            },
            subtopicContent: {
                type: String,
                required: true
            },
            ImageUrl: {
                type: String
            },
            createdDate: {
                type: Date,
                default: Date.now()
            }
        
});
const contentStructure = new mongoose.Schema({
    TopicName: {
        type: String,
        required: true
    },
    CourseId: {
        type: String,
        required: true
    },
    sectionId: {
        type: String,
        required: true
    },
    TopicId: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    content: [
        subtopicContentStructure
    ]
});

const Content =  mongoose.models.Content || mongoose.model("Content",contentStructure);
module.exports = Content;