const Transporter = require("./TransporterFun");
const User = require("../../models/User");
const sendEmail = async (Email, content, subject) => {
    const transporter = Transporter();
    const mailOptions = {
        from: 'educationrevolutionpa760@gmail.com',
        to: 'ayushsinghalmains@gmail.com',
        subject: subject,
        html: content,
    };
    await transporter.sendMail(mailOptions);
};

const sendAllEmail = async (content) => {
    const UserDetail = await User.find();
    let userEmails = [];
    userEmails = UserDetail.map((elem) => {
        return elem.email;
    });
    const transporter = Transporter();
    const mailOptions = {
        from: 'educationrevolutionpa760@gmail.com',
        to: 'singhalayushccc@gmail.com',
        subject: 'Quiz-Information',
        html: content,
    };
    await transporter.sendMail(mailOptions);

};
module.exports = {sendEmail, sendAllEmail};