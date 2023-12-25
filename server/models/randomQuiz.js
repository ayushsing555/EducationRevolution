const mongoose = require("mongoose");
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
const randomSchema = mongoose.Schema({
    date: {
        type: Date,
    },
    duration:{
        type:Number,
    },
    QuizName:{
        type:String
    },
    users: [UserAttemptSchema],
    quiz: [QuizStructure],
})
const RandomQuiz = mongoose.models.RandomQuiz || mongoose.model("RandomQuiz",randomSchema);
module.exports = RandomQuiz;