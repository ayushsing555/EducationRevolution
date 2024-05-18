module.exports = function TransporterFun() {
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'educationrevolutionpa760@gmail.com',
            pass: 'onsokngfpvktnvwh',
        },
    });
    return transporter;
};