const mongoose = require('mongoose');

const QuizStructure = mongoose.Schema({
    questionName: String,
    options: [String],
    answer: String,
    imageUrl: String
});

const UserAttemptSchema = mongoose.Schema({
    email: {
        type: String
    },
    attempts: [
        {
            score: {
                type: Number
            },
            date: {
                type: Date,
                default: Date.now
            },
            wrongAnswers:[]
        }
    ]
});

const DailyQuizStructure = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    quiz: [QuizStructure],
    users: [UserAttemptSchema]
});

const DailyQuiz = mongoose.models.DailyQuiz || mongoose.model('DailyQuiz', DailyQuizStructure);
module.exports = DailyQuiz;
