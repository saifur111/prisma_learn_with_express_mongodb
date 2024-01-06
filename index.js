const coookieParser = require("cookie-parser");
const express = require("express");
//dot env
require('dotenv').config();
const app =express();
//Regular Middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// cookies middleware
app.use(coookieParser());
const port =8000;

// custom router
const userRouter = require("./routes/userRoutes")
const postRouter = require("./routes/postRoutes")
app.use("/api",userRouter)
app.use("/api",postRouter)

app.get('/',(req,res)=>{
    res.send('Hi ');
})

app.listen(port,()=>{
    console.log("Server is running on port ",port)
})