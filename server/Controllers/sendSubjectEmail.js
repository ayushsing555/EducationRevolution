const User = require("../models/User");
const {MeetingTomorrow, ProjectUpdate, FeedbackRequest, EventInvitation, ImportanceAnnouncement, EmailTemplateForNotifyQuiz, getEmail} = require("./EmailProvider/EmailContent");
const RandomQuiz = require("../models/randomQuiz");
const {sendAllEmail, sendEmail} = require("./EmailProvider/sendEmail");

const sendSubjectEmail = async (req, res) => {
    const {email, subject, AllStudents} = req.body; // here email contains Student Id
    const userDetail = await User.findOne({_id: email});
    const Email = userDetail.email;
    let EmailContent;
    console.log(AllStudents);
    // if (subject == 'Meeting Tomorrow')
    //     EmailContent = MeetingTomorrow(subject);
    // else if (subject == 'Project Update')
    //     EmailContent = ProjectUpdate(subject);
    // else if (subject == 'Feedback Request')
    //     EmailContent = FeedbackRequest(subject);
    // else if (subject == 'Event Invitation')
    //     EmailContent = EventInvitation(subject);
    // else if (subject == 'Important Announcement')
    //     EmailContent = ImportanceAnnouncement(subject);
    // else
    //     EmailContent = WeeklyNewslater(subject);
    EmailContent = getEmail(subject);
    // if (!AllStudents) {
    //     sendEmail(Email, EmailContent);
    // }
    // else {
    //     sendAllEmail(EmailContent);
    // }
    sendEmail(Email, EmailContent, 'subjetive Email');

};

const sendEmailForQuiz = async (req, res) => {
    const {QuizId} = req.body;
    let QuizDetail = await RandomQuiz.findOne({_id: QuizId});
    let EmailContent = EmailTemplateForNotifyQuiz(QuizDetail);
    sendAllEmail(EmailContent);
};

module.exports = {sendSubjectEmail, sendEmailForQuiz};