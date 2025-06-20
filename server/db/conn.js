const mongoose = require("mongoose");
 const url = 'mongodb+srv://ayushsinghalmains:Ayush123@personal.tzbghhj.mongodb.net/Educational';
// const url = "mongodb://localhost:27017/EducationRevolution";
mongoose.connect(url).then(()=>{
    console.log("successfully connected");
}).catch((err)=>{
    console.log(err)
})