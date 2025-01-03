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

const getSalesforceUser = async(req,res)=>{
    const users = await User.find();
    res.status(200).send({status:200,data:users});
}

const SendOtp = async (req, res) => {
    const {email} = req.body;
    console.log(email);
    const otp = getOtp();
    const EmailContent = OtpEmail(otp);
    sendEmail(email, EmailContent, 'Account-verification');
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
    return res.status(200).send({success: true, token: token, name: isExist.name, email: isExist.email, message: "Successfully logged in"});
};

const AddCourse = async (req, res) => {
    try {
        const {name} = req.body;
        const id = ShortPassword();

        const isExistCourse = await Course.find({name});

        if (isExistCourse.length != 0) {

            return res.status(300).send({success: false, message: "This is Already Existed"});
        }

        // Create a new course with an empty array of sections
        const newCourse = new Course({name, id});

        // Save the course
        console.log(newCourse);
        const generatedCourse = await newCourse.save();



        console.log(generatedCourse);

        if (generatedCourse) {
            return res.status(200).send({success: true, message: "successfully added"});
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({success: false, error: "something went wrong"});
    }

};

const AddSection = async (req, res) => {
    try {
        const {courseName, sectionName} = req.body;
        const existingCourse = await Course.findOne({name: courseName});
        if (!existingCourse) {
            return res.status(400).send({success: false, error: "Course not found"});
        }

        const newSection = {
            name: sectionName,
        };
        existingCourse.sections.push(newSection);

        await existingCourse.save();

        return res.status(200).send({success: true, message: "Section added to the Course successfully."});
    }
    catch (err) {
        console.error("Error:", err);
        return res.status(400).send({success: false, message: "something went wrong"});
    }

    // Attempt to add the section to the course
    //     try {
    //         const newSection = existingCourse.addSection(sectionName);

    //         existingCourse.totalSections = existingCourse.sections.length;

    //         return res.status(200).send({success: true, message: "Successfully added"});
    //     } catch (error) {
    //         if (error.name === 'ValidationError') {
    //             // Handle the validation error for duplicate section name
    //             return res.status(400).send({success: false, error: "Section name must be unique"});
    //         } else {
    //             // Handle other errors with a more specific message
    //             return res.status(400).send({success: false, error: "Failed to add section"});
    //         }
    //     }
    // } catch (error) {
    //     // Handle any other unexpected errors with a specific message
    //     return res.status(500).send({success: false, error: "Internal server error"});
    // }
};



const getOneCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const individualCourse = await Course.findOne({name: id});
        if (individualCourse) {
            return res.status(200).send(individualCourse);
        }
    } catch (error) {
        console.log(error);
    }


};

const AddTopic = async (req, res) => {
    const {courseId, sectionId, topicName} = req.body;
    const newTopic = {
        name: topicName, // Set the name of the topic
    };
    try {
        // Find the course by its _id
        const course = await Course.findOne({name: courseId}).exec();

        if (!course) {
            return res.status(400).send({success: false, message: "Course not found."});


        }

        // Find the section within the course by its _id
        const section = course.sections.id(sectionId);

        if (!section) {
            return res.status(400).send({success: false, message: "Section not found in the course."});

        }

        // Add the new topic to the section's Topic array
        section.Topic.push(newTopic);

        // Save the course to persist the changes
        await course.save();
        return res.status(200).send({success: true, message: "Topic added to the section successfully."});
    } catch (err) {
        return res.status(400).send({success: false, message: "something went wrong"});

        console.error("Error:", err);
    }
};


const getCourse = async (req, res) => {
    const courses = await Course.find();
    res.status(200).send(courses);
};

const AddContent = async (req, res) => {
    try {
        const {topicName, content, sectionId, topicId, courseId} = req.body;
        console.log(courseId);
        const course = await Course.findOne({name: courseId}).exec();
        if (!course) {
            return res.status(400).send({message: "course is not found"});
        }
        console.log(course);
        const section = await course.sections.id(sectionId);
        if (!section) {
            return res.status(400).send({message: "section is not found"});
        }
        console.log(section);
        const topic = await section.Topic.id(topicId);
        if (!topic) {
            return res.status(400).send({message: "topic is not found"});
        }
        console.log(topic);
        for (var i = 0; i < content.length; i++) {
            // Check if the 'image' field is provided and not empty
            if (content[i].url && content[i].url.trim() !== "") {
                topic.content.push(content[i]);
            } else {
                // If 'image' is empty, you can remove it from the content object
                const {url, ...contentWithoutImage} = content[i];
                topic.content.push(contentWithoutImage);
            }
        }
        console.log(topic.content);
        await course.save();
        return res.status(200).send({success: true, message: "Content uploaded"});
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({success: false, message: "something went wrong"});
    }

};

const CourseUpdate = async (req, res) => {
    try {
        const {courseName, updatedValue} = req.body;
        const ExistingCourse = await Course.findOne({name: courseName});
        if (ExistingCourse) {
            ExistingCourse.name = updatedValue;
        }
        const result = await ExistingCourse.save();
        if (result) {
            res.status(200).send({success: true, message: "Update Successfully"});
        }
    } catch (error) {
        res.status(400).send({success: false, error: "Some thing went Wrong"});
    }
};

const SectionUpdate = async (req, res) => {
    try {
        const {courseName, sectionId, updatedValue} = req.body;
        const ExistingCourse = await Course.findOne({name: courseName}).exec();
        const ExistingSection = await ExistingCourse.sections.id(sectionId);
        if (ExistingSection) {
            ExistingSection.name = updatedValue;
        }
        // console.log(ExistingSection);
        const result = await ExistingCourse.save();
        if (result) {
            res.status(200).send({success: true, message: "Update Successfully"});
        }
    } catch (error) {
        res.status(400).send({success: false, message: "Update Successfully"});
    }
};

const TopicUpdate = async (req, res) => {
    const {courseName, sectionId, topicId, updatedValue} = req.body;

    try {
        const ExistingCourse = await Course.findOne({name: courseName}).exec();
        const ExistingSection = await ExistingCourse.sections.id(sectionId);
        const ExistingTopic = await ExistingSection.Topic.id(topicId);
        if (ExistingTopic) {
            ExistingTopic.name = updatedValue;
        }
        const result = await ExistingCourse.save();
        if (result) {
            res.status(200).send({success: true, message: "Update Successfully"});
        }
    } catch (error) {
        res.status(400).send({success: false, message: "Update Successfully"});
    }

};

const ContentUpdate = async (req, res) => {
    try {
        const {name, sectionId, topicId, contentId, contentName, content} = req.body;
        console.log(name, sectionId, topicId, contentId, contentName, content);
        if (content == "" && contentName == "") {
            return res.status(200).send({success: true, message: "Successfully updated"});
        }
        const ExistingCourse = await Course.findOne({name: name}).exec();
        const ExistingSection = await ExistingCourse.sections.id(sectionId);
        const ExistingTopic = await ExistingSection.Topic.id(topicId);
        const ExistingContent = await ExistingTopic.content.id(contentId);
        console.log(ExistingContent);
        if (ExistingContent) {
            if (content !== "")
                ExistingContent.content = content;
            if (contentName !== "") {
                ExistingContent.name = contentName;
            }
        }
        const result = await ExistingCourse.save();
        if (result) {
            return res.status(200).send({success: true, message: "successfully updated"});
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({success: false, error: "some thing went wrong"});
    }


};

const ContentDelete = async (req, res) => {
    const {name, sectionId, topicId, contentId} = req.body;
    try {
        const course = await Course.findOne({name: name});

        if (!course) {
            return res.status(400).send({success: true, error: "Something went wrong"});

        }

        const section = course.sections.find((s) => s._id.toString() === sectionId);

        if (!section) {
            return res.status(400).send({success: false, error: "Something went wrong"});

        }

        const topic = section.Topic.find((t) => t._id.toString() === topicId);


        if (!topic) {
            return res.status(400).send({success: false, error: "Something went wrong"});

        }


        const contentIndex = topic.content.findIndex((c) => c._id.toString() === contentId);


        if (contentIndex === -1) {
            console.log(`Content ${contentId} not found in topic ${topicId} of section ${sectionId} in course ${courseName}.`);
            return res.status(400).send({success: false, error: "Something went wrong"});

        }


        topic.content.splice(contentIndex, 1);

        await course.save();

        return res.status(200).send({success: true, message: "Deleted Successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).send({success: true, error: "Something went wrong"});

    }
};

const TopicDelete = async (req, res) => {
    const {name, sectionId, topicId} = req.body;
    try {
        const course = await Course.findOne({name: name});

        if (!course) {
            return res.status(400).send({success: true, error: "Something went wrong"});

        }

        const section = course.sections.find((s) => s._id.toString() === sectionId);

        if (!section) {
            return res.status(400).send({success: false, error: "Something went wrong"});

        }

        const topicIndex = section.Topic.findIndex((t) => t._id.toString() === topicId);


        if (topicIndex == -1) {
            return res.status(400).send({success: false, error: "Something went wrong"});

        }

        section.Topic.splice(topicIndex, 1);

        // Save the changes
        await course.save();

        return res.status(200).send({success: true, message: "Deleted Successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).send({success: true, error: "Something went wrong"});

    }

};

const SectionDelete = async (req, res) => {
    const {name, sectionId} = req.body;
    try {
        const course = await Course.findOne({name: name});

        if (!course) {
            return res.status(400).send({success: false, error: "Something went wrong"});

        }
        const sectionIndex = course.sections.findIndex((s) => s._id.toString() === sectionId);

        if (sectionIndex == -1) {
            return res.status(400).send({success: false, error: "Something went wrong"});

        }

        course.sections.splice(sectionIndex, 1);

        await course.save();
        return res.status(200).send({success: true, message: "Deleted Successfully"});


    } catch (error) {
        console.log(error);
        return res.status(400).send({success: false, error: "Something went wrong"});
    }
};

const CourseDelete = async (req, res) => {
    const {name} = req.body;
    try {
        await Course.findOneAndDelete({name: name});
        return res.status(200).send({success: true, message: "Deleted Successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).send({success: false, error: "Something went wrong"});
    }
};

const getSingleUser = async (req, res) => {
    const email = req.params.id;
    const existingUser = await User.findOne({_id: email});

    console.log(existingUser);
    return res.status(200).send(existingUser);
};


module.exports = {getUsers,getSalesforceUser, getSingleUser, ContentDelete, SectionDelete, CourseDelete, TopicDelete, ContentUpdate, CourseUpdate, SectionUpdate, TopicUpdate, AddTopic, AddContent, getCourse, getOneCourse, AddSection, AddCourse, SendOtp, registerUser, loginUser};
