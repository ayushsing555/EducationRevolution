    const mongoose = require("mongoose");
    const jwt = require("jsonwebtoken");
    const userSchema = new mongoose.Schema({
        name: String,
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        coins:{
            type:Number,
            default:0
        },
        badges:{
            type:Number,
            default:0
        },

        Activity:[{ 
            date:{
                type:Date,
                default:Date.now
            },
            Attempt:{       
                type:Boolean,
                default:false
            },
            dailyQuiz:{
                type:Boolean,
                default:false
            }
        }]
    }
    );
    userSchema.methods.generateToken = async function (next) {
        try {
            const token = jwt.sign({_id: this._id.toString()}, "EducationalDeb");
            return token;
        } catch (error) {
            console.log(error);
        }
    };
    const User = mongoose.models.User || mongoose.model('User', userSchema);
    module.exports = User;
