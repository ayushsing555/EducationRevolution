
const OtpEmail = (otp) => {
    const content = `<div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1;">
        <div style="text-align: center;">
            <h1 style="color: #333;">OTP Verification</h1>
        </div>
        <div style="text-align: center; margin-top: 20px;">
            <p>Your Verification code  is:</p>
            <div style="background-color: #0073e6; color: #fff; font-size: 24px; text-align: center; padding: 10px; border-radius: 5px;">${otp}</div>
        </div>
    </div>`;
    return content;
};

const signupEmail = (name, email, password) => {
    const content = `
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
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
</body>`;
    return content;
};
module.exports = {signupEmail, OtpEmail};