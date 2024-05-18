const mongoose = require("mongoose");
const url = 'mongodb+srv://ayushsinghalmains:Ayush123@personal.tzbghhj.mongodb.net/Educational';
mongoose.connect(url).then(()=>{
    console.log("successfully connected")
}).catch((err)=>{
    console.log(err)
})