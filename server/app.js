const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cookieparser = require("cookie-parser");
app.use(cookieparser());
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"});
require("./db/conn");
const routerPath = require("./Route/route.js");
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))
app.use("/",routerPath);
app.listen(port,"0.0.0.0", () => {
    console.log("listen Successful");
});