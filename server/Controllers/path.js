const User = require("../models/User");
const Course = require("../models/course");
const {getOtp, ShortPassword} = require("./tokens/token");
const {sendEmail} = require("./EmailProvider/sendEmail");
const {signupEmail, OtpEmail} = require("./EmailProvider/EmailContent");
const Transporter = require("../Controllers/EmailProvider/TransporterFun");
const getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).send(users);
};

const SendOtp = async (req, res) => {
    const {email} = req.body;
    console.log(email);
    const otp = getOtp();
    const EmailContent = OtpEmail(otp);
    sendEmail(email, EmailContent);
    res.status(200).send({result: true, otp: otp});
};

const registerUser = async (req, res) => {
    try {
        const {name, email, password, gender} = req.body;
        console.log(name + " " + email + " " + password + " " + gender);
        let isExiting = await User.findOne({email: email});
        if (isExiting) {
            return res.status(400).send({error: 'Email Already Exist'});
        }
        const newUser = new User({
            name, email, password, gender
        });
        const newUserData = await newUser.save();
        res.status(200).send({success: true, Message: 'Successfully registered'});
        if (newUserData) {
            const EmailContent = signupEmail(name, email, password);
            sendEmail(email, EmailContent);
        }
    } catch (error) {
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    const isExist = await User.findOne({email: email});
    if (!isExist) {
        return res.status(400).send({success: false, error: "user doesn't exist"});
    }
    if (isExist.password != password) {
        return res.status(400).send({success: false, error: "Invalid Credentials"});
    }
    const token = await isExist.generateToken();
    const g = await res.cookie("token", token);
    return res.status(200).send({success: true, token: token, name: isExist.name, message: "Successfully logged in"});
};

const AddCourse = async (req, res) => {
    try {
        const {name} = req.body;
        const id = ShortPassword();
        const newCourse = new Course({
            name, id
        });
        const generatedCourse = await newCourse.save();
        if (generatedCourse) {
            return res.status(200).send({success: true, message: "successfully added"});
        }
    } catch (error) {
        return res.status(400).send({success: false, error: "something went wrong"});
    }


};

const getCourse = async (req,res) => {
    const courses = await Course.find();
    res.status(200).send(courses);
};
module.exports = {getUsers, getCourse, AddCourse, SendOtp, registerUser, loginUser};