const mongoose = require('mongoose');
const QuizStructure = mongoose.Schema({
    questionName: String,
    options: [String],
    answer: String,
    imageUrl :String
})
const Quiz = mongoose.models.Quiz||mongoose.model('Quiz',QuizStructure);
module.exports = Quiz;