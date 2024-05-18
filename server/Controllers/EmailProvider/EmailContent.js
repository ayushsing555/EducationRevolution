
const OtpEmail = (otp) => {
    const content = `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
    </style>
</head>
<body style="height: 100vh;
width: 100%;
background-color: hsl(0, 0%, 94%); ">
    <div class="container" style="width: 50%;
    height: 60%;
    position: relative;
    top: 12%;
    left: 25%;
    border-top: 10px solid blueviolet;
    background-color: #FFFFFF;
    /* border-left: 2px solid black;
    border-right: 2px solid black; */
    border-bottom: 2px solid black;
    box-shadow: 1px 2px 3px rgb(83, 83, 173),
    -1px -2px 3px rgb(83, 83, 173);">
        <h1 style="color: #414141;
        text-shadow: 3px 3px 4px blueviolet;
        text-align: center;
        font-size: 3.5rem;
        padding-top: 20px;
        padding-bottom: 40px;
        font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">
            Education Revolution
        </h1>

        <p style="text-align: center;
        font-size: 1.1rem;
        padding-top: 20px;
        font-family: sans-serif;">
            Please use the below OTP to login to our portal.
        </p>
        
        <!-- OTP Goes from here  -->
        <h2 style="color: blueviolet;
        font-size: 3rem;
        text-shadow: 2px 2px 2px grey;
        text-align: center;
        padding-top: 30px;
        padding-bottom: 30px;">
            ${otp}
        </h2 >

        <p style="text-align: center;
        font-size: 1.1rem;
        padding-top: 20px;
        font-family: sans-serif;">
            This code is valid for the next ten minutes. Please do not share your OTP with anyone.
        </p>

        
    </div >

    <div class="container2" style="width: 50%;
    position: relative;
    top: 12%;
    left: 25%;">
        
        <p style="text-align: center;
        font-size: 1rem;
        padding-top: 20px;
        font-family: sans-serif;">
            contact@educationRevolution.com
        </p>
        <p style="text-align: center;
        font-size: 1rem;
        padding-top: 20px;
        font-family: sans-serif;">
            This email was sent to you because you are subscribed to receive updates from <span style="color: blueviolet; font-weight: 800;">Education Revolution.</span>
        </p>
    </div>
    
</body >
</html > `;
    return content;
};

const signupEmail = (name, email, password) => {
    const content = `
    <body style = "font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;" >
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1;">
            <div style="text-align: center;">
                <h1 style="color: #333;">Welcome to Our Platform!</h1>
            </div>
            <div style="text-align: left; margin-top: 20px;">
                <p>Hello [${name}],</p>
                <p>Thank you for registering with our platform. Your account has been successfully created.</p>
                <p>Your login credentials are as follows:</p>
                <ul>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Password:</strong> ${password}</li>
                </ul>
                <p>You can now log in and start exploring our platform.</p>
                <p>If you have any questions or need assistance, feel free to contact our support team at [].</p>
            </div>
        </div>
</body > `;
    return content;
};

const SubjectiveEmail = (name, subject) => {

};

const EmailTemplateForNotifyQuiz = (QuizDetail) => {
    const content = `
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333333; padding: 20px;">
    <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); max-width: 600px; margin: 0 auto;">
        <div style="background-color: #007bff; color: #ffffff; padding: 10px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1>Quiz Notification</h1>
        </div>
        <div style="padding: 20px;">
            <p>Dear Student,</p>
            <p>We are excited to inform you about an upcoming quiz. Please find the details below:</p>
            <p><strong>Quiz Name:</strong> ${QuizDetail.QuizName}</p>
            <p><strong>Quiz Duration:</strong> ${QuizDetail.duration} minutes</p>
            <p>We encourage you to take the quiz within the scheduled time.</p>
            <p>Best of luck!</p>
            <p>Regards,</p>
            <p>Your Education Team</p>
            <a href='http://localhost:3000/Quizes/${QuizDetail._id}' style="display: inline-block; padding: 10px 20px; margin: 20px 0; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Start Quiz</a>
        </div>
        <div style="text-align: center; padding: 10px; font-size: 0.9em; color: #888888;">
            <p>© 2024 Education Revolution. All rights reserved.</p>
        </div>
    </div>
</body>
    `;
    return content;
};

const getEmail = (subject) => {
    const content = `<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0;">
  <table style="width: 100%; max-width: 600px; margin: 20px auto; border: 1px solid #cccccc; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <tr>
      <td style="text-align: center; padding: 10px 0;">
        <h2 style="margin: 0; color: #333333;">Meeting Request</h2>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px;">
        <p style="margin: 0 0 10px 0; color: #555555;">Dear Aditya,</p>
        <p style="margin: 0 0 10px 0; color: #555555;">
          I hope this email finds you well. I would like to schedule a meeting with you to discuss your progress and any questions you might have regarding the course. 
        </p>
        <p style="margin: 0 0 10px 0; color: #555555;">
          Please let me know your availability by selecting a suitable time from the options below:
        </p>
        <ul style="margin: 0 0 20px 20px; color: #555555;">
          <li style="margin-bottom: 10px;">Option 1: Monday, May 20, 2024, at 10:00 AM</li>
          <li style="margin-bottom: 10px;">Option 2: Wednesday, May 22, 2024, at 2:00 PM</li>
          <li style="margin-bottom: 10px;">Option 3: Friday, May 24, 2024, at 11:00 AM</li>
        </ul>
        <p style="margin: 0 0 10px 0; color: #555555;">
          If none of these times work for you, please suggest an alternative time that fits your schedule.
        </p>
        <p style="margin: 0 0 10px 0; color: #555555;">
          Looking forward to our meeting.
        </p>
        <p style="margin: 0 0 10px 0; color: #555555;">Best regards,</p>
        <p style="margin: 0 0 10px 0; color: #555555;">Ayush singhal</p>
        <p style="margin: 0 0 10px 0; color: #555555;">Administrator</p>
        <p style="margin: 0 0 10px 0; color: #555555;">Educationrevolutionpa165@gmail.com</p>
      </td>
    </tr>
  </table>
</body>`;
    return content;
};
module.exports = {signupEmail, getEmail, OtpEmail, EmailTemplateForNotifyQuiz};;