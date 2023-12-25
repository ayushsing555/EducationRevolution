const Course = require("../models/course");
const AllQuizSchema = require("../models/quiz");
const DailyQuiz = require("../models/dailyQuiz");
const {GetQuizId} = require("./tokens/token");
const User = require("../models/User");
const RandomQuiz = require("../models/randomQuiz");
const {getRandomGenerateQuestion} = require("../Controllers/Functions/getRandomGenerateQuestion");
const AddContentQuiz = async (req, res) => {
    const {Quiz, name, sectionId, topicId, QuizName} = req.body;
    try {
        const course = await Course.findOne({name: name}).exec();

        if (!course) {
            return res.status(400).send({success: false, error: "Something went wrong"});
        }
        const section = await course.sections.id(sectionId);

        if (!section) {
            return res.status(400).send({success: false, error: "Something went wrong"});
        }

        const topic = await section.Topic.id(topicId);

        if (!topic) {
            return res.status(400).send({success: false, error: "Something went wrong"});
        }
        console.log(QuizName);
        const id = GetQuizId();
        topic.Quizes.push({
            QuizName: QuizName,
            QuizId: id,
            QuizSet: Quiz
        });
        await course.save();
        res.status(200).send({success: true, message: "Quiz Added Successfully"});
        for (let a = 0; a < Quiz.length; a++) {
            const newQuiz = new AllQuizSchema(
                Quiz[a]
            );
            await newQuiz.save();
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({success: false, error: "Something went wrong"});
    }


};

const AddSectionQuiz = async (req, res) => {
    const {Quiz, name, sectionId, QuizName} = req.body;
    console.log(Quiz, name, sectionId, QuizName);
    try {
        const course = await Course.findOne({name: name}).exec();
        if (!course) {
            return res.status(400).send({success: false, error: "Something went wrong"});
        }
        const section = await course.sections.id(sectionId);
        if (!section) {
            return res.status(400).send({success: false, error: "Something went wrong"});
        }
        const id = GetQuizId();
        section.Quizes.push({
            QuizName: QuizName,
            QuizId: id,
            QuizSet: Quiz
        });
        await course.save();
        res.status(200).send({success: true, message: "Quiz Added Successfully"});
        for (let a = 0; a < Quiz.length; a++) {
            const newQuiz = new AllQuizSchema(
                Quiz[a]
            );
            await newQuiz.save();
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({success: false, error: "Something went wrong"});
    }
};

const AddCourseQuiz = async (req, res) => {
    const {Quiz, name, QuizName} = req.body;
    try {
        const ExistingCourse = await Course.findOne({name: name}).exec();
        if (!ExistingCourse) {
            return res.status(400).send({success: false, error: "Something went wrong"});
        }
        const id = GetQuizId();
        ExistingCourse.Quizes.push({
            QuizName: QuizName,
            QuizId: id,
            QuizSet: Quiz
        });
        await ExistingCourse.save();
        res.status(200).send({success: true, message: "Quiz Added Successfully"});
        for (let a = 0; a < Quiz.length; a++) {
            const newQuiz = new AllQuizSchema(
                Quiz[a]
            );
            await newQuiz.save();
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({success: false, error: "Something went wrong"});
    }
};

const GetAllQuiz = async (req, res) => {
    const All = await AllQuizSchema.find();
    res.send(All);
};

const GetDailyQuiz = async (req, res) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    try {
        const existingQuiz = await DailyQuiz.findOne({date: currentDate});

        if (!existingQuiz) {
            const latestQuiz = await DailyQuiz.findOne().sort({date: 'desc'});
            let startMissingDate = new Date();
            startMissingDate.setHours(0, 0, 0, 0);
            // If there are no quizzes in the database, set the start date to the current date
            if (latestQuiz) {
                startMissingDate = new Date(latestQuiz.date);
                startMissingDate.setDate(startMissingDate.getDate() + 1); // Start from the next day
            }
            // Iterate over missing dates and create quizzes
            while (startMissingDate <= currentDate) {
                const existingQuizForMissingDate = await DailyQuiz.findOne({date: startMissingDate});

                if (!existingQuizForMissingDate) {
                    const allQuestions = await AllQuizSchema.find();
                    const randomGenerateQuestions = getRandomGenerateQuestion(allQuestions, 4);

                    const newDailyQuiz = new DailyQuiz({
                        date: new Date(startMissingDate),
                        quiz: randomGenerateQuestions
                    });

                    await newDailyQuiz.save();
                    console.log('Quiz for the missing date created:', startMissingDate);
                } else {
                    console.log('Quiz already exists for the date:', startMissingDate);
                }

                startMissingDate.setDate(startMissingDate.getDate() + 1); // Move to the next day
            }

            const Quizes = await DailyQuiz.find();
            res.status(200).send(Quizes);
        } else {
            const Quizes = await DailyQuiz.find();
            res.status(200).send(Quizes);
        }
    } catch (error) {
        console.error('Error setting daily quiz:', error);
        res.status(500).json({message: 'Internal Server Error'});
    }


};

const saveResult = async (req, res) => {
    try {
        const {email, score, wrongAnswer, isCurrentDay} = req.body;

        const existingUser = await User.findOne({email: email});
        const userAttemptDetail = {
            email: email,
            attempts: [
                {
                    score: score,
                    wrongAnswers: wrongAnswer
                }
            ]
        };
        const id = req.params.id;
        const ExistingDailyQuiz = await DailyQuiz.findOne({_id: id});
        if (!ExistingDailyQuiz) {
            return res.status(400).send({success: false, error: "Daily Quiz not found"});
        }
        const hasAttemptedIndex = await ExistingDailyQuiz.users.findIndex(user => user.email == email);
        const currentDate = new Date().setHours(0, 0, 0, 0);
        let existingActivityForCurrentDate = existingUser.Activity.find(
            (activity) => activity.date.setHours(0, 0, 0, 0) === currentDate
        );

        if (!existingActivityForCurrentDate) {
            // If an entry for the current date doesn't exist, add a new entry
            existingUser.Activity.push({
                Attempt: false,
                date: currentDate,
                dailyQuiz: false,
            });
        }
        existingActivityForCurrentDate = existingUser.Activity.find(
            (activity) => activity.date.setHours(0, 0, 0, 0) === currentDate
        );

        if (isCurrentDay) {
            existingActivityForCurrentDate.Attempt = true;
            existingActivityForCurrentDate.dailyQuiz = true;
        }
        else {
            existingActivityForCurrentDate.Attempt = true;
        }
        if (hasAttemptedIndex == -1) {
            ExistingDailyQuiz.users.push(
                userAttemptDetail
            );
            if (score >= 4 && isCurrentDay) {
                existingUser.coins = existingUser.coins + 1;
            }
        } else {
            const currentdate = new Date().setHours(0, 0, 0, 0).toString();
            const ExistingDate = await ExistingDailyQuiz.date.setHours(0, 0, 0, 0).toString();
            if (currentdate == ExistingDate) {
                return res.status(400).send({success: false, error: "You can not Submit Daily Quiz Twice"});
            }
            ExistingDailyQuiz.users[hasAttemptedIndex].attempts.push(
                {
                    score: score,
                    wrongAnswers: wrongAnswer
                }
            );
        }
        await existingUser.save();
        await ExistingDailyQuiz.save();
        res.status(200).send({success: true, message: "Score Saved Successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).send({success: false, error: "Something went wrong"});
    }
};

const getCourseQuiz = async (req, res) => {
    try {
        const name = req.params.name;
        const existingCourse = await Course.findOne({name: name}).exec();
        if (!existingCourse) {
            return res.status(400).send({success: false, error: "Course is not found"});
        }
        return res.status(200).send({success: true, data: existingCourse.Quizes});
    }
    catch (e) {
        console.log('the error is', e);
        return res.status(400).send({success: false, error: "Course is not found"});

    }
};

const getSectionQuiz = async (req, res) => {
    try {
        const name = req.params.name;
        const sectionId = req.params.sectionId;
        const existingCourse = await Course.findOne({name: name}).exec();
        if (!existingCourse) {
            return res.status(400).send({success: false, error: "Course is not found"});
        }
        const existingSection = await existingCourse.sections.id(sectionId);
        return res.status(200).send({success: true, data: existingSection.Quizes});
    }
    catch (e) {
        console.log('the error is', e);
        return res.status(400).send({success: false, error: "Course is not found"});

    }
};

const getTopicQuiz = async (req, res) => {
    try {
        const name = req.params.name;
        const sectionId = req.params.sectionId;
        const topicId = req.params.topicId;
        const existingCourse = await Course.findOne({name: name}).exec();
        if (!existingCourse) {
            return res.status(400).send({success: false, error: "Course is not found"});
        }
        const existingSection = await existingCourse.sections.id(sectionId);
        if (!existingSection) {
            return res.status(400).send({success: false, error: "section is not found"});
        }

        const existingTopic = await existingSection.Topic.id(topicId);
        if (!existingTopic) {
            return res.status(400).send({success: false, error: "section is not found"});
        }

        return res.status(200).send({success: true, data: existingTopic.Quizes});
    }
    catch (e) {
        console.log('the error is', e);
        return res.status(400).send({success: false, error: "Course is not found"});

    }
};

const getCourseSingleQuiz = async (req, res) => {
    try {
        const name = req.params.name;
        const QuizId = req.params.QuizId;
        const existingCourse = await Course.findOne({name: name}).exec();
        if (!existingCourse) {
            res.status(400).send({success: false, error: "ExistingCourse is not found"});
        }
        const existingQuiz = await existingCourse.Quizes.id(QuizId);
        if (!existingQuiz) {
            return res.status(400).send({success: false, error: "Quiz is not found"});
        }
        return res.status(200).send({success: true, data: existingQuiz});
    } catch (error) {
        console.log(error);
    }

};

const getSectionSingleQuiz = async (req, res) => {
    try {
        const name = req.params.name;
        const QuizId = req.params.QuizId;
        const sectionId = req.params.sectionId;
        const existingCourse = await Course.findOne({name: name}).exec();
        if (!existingCourse) {
            res.status(400).send({success: false, error: "ExistingCourse is not found"});
        }
        const existingSection = await existingCourse.sections.id(sectionId);
        if (!existingSection) {
            return res.status(400).send({success: false, error: "section is not found"});
        }

        const existingQuiz = await existingSection.Quizes.id(QuizId);
        if (!existingQuiz) {
            return res.status(400).send({success: false, error: "Quiz is not found"});
        }

        return res.status(200).send({success: true, data: existingQuiz});
    } catch (error) {
        console.log(error);
    }

};

const getTopicSingleQuiz = async (req, res) => {
    try {
        const name = req.params.name;
        const QuizId = req.params.QuizId;
        const sectionId = req.params.sectionId;
        const topicId = req.params.topicId;
        const existingCourse = await Course.findOne({name: name}).exec();
        if (!existingCourse) {
            res.status(400).send({success: false, error: "ExistingCourse is not found"});
        }
        const existingSection = await existingCourse.sections.id(sectionId);
        if (!existingSection) {
            return res.status(400).send({success: false, error: "section is not found"});
        }

        const existingTopic = await existingSection.Topic.id(topicId);
        if (!existingTopic) {
            return res.status(400).send({success: false, error: "section is not found"});
        }
        const existingQuiz = await existingTopic.Quizes.id(QuizId);
        if (!existingQuiz) {
            return res.status(400).send({success: false, error: "Quiz is not found"});
        }

        return res.status(200).send({success: true, data: existingQuiz});

        console.log(name, sectionId, topicId, QuizId);
    } catch (error) {
        console.log(error);
    }
};

const AddRandomQuiz = async (req, res) => {
    const {QuizName, Questions, timeDuration, QuizDate} = req.body;
    const newRandomQuiz = new RandomQuiz({
        QuizName: QuizName,
        quiz: Questions,
        duration: Number(timeDuration),
        date: new Date(QuizDate)
    });
    
    await newRandomQuiz.save();
    res.status(200).send({success: true, message: "Quiz Saved"});
    for (let a = 0; a < Questions.length; a++) {
        const newQuiz = new AllQuizSchema(
            Questions[a]
        );
        await newQuiz.save();
    }
};

const getRandomQuiz = async (req, res) => {
    const AllRandomQuiz = await RandomQuiz.find();
    res.send(AllRandomQuiz);
};
module.exports = {getCourseSingleQuiz, getRandomQuiz, AddRandomQuiz, getSectionSingleQuiz, getTopicSingleQuiz, AddContentQuiz, getCourseQuiz, getTopicQuiz, getSectionQuiz, saveResult, GetDailyQuiz, GetAllQuiz, AddSectionQuiz, AddCourseQuiz};