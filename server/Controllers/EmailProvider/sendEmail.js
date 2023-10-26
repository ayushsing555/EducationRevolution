const Transporter = require("./TransporterFun");
const sendEmail = async(Email,content) =>{
    const transporter = Transporter();
    const mailOptions = {
            from: 'queryquest750@gmail.com',
            to: Email,
            subject: 'Account Verification - OTP',
            html: content,
        };
        await transporter.sendMail(mailOptions);
}
module.exports = {sendEmail};