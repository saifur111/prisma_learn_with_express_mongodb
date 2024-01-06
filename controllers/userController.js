// bring in prisma and cookie
const prisma = require('../prisma/index');
const cookieToken = require("../utils/cookieToken");

// user signup
exports.signup = async (req,res,next)=>{
    try {
        const { name , email , password} = req.body;
        // check 
        if(!name|| !email || !password){
           throw new Error("Please provide all fields.."); 
        }
        const user =await prisma.user.create({
            data:{
                name,
                email,
                password,
            }
        })
        // send user a token 
        cookieToken(user,res)
    } catch (error) {
        throw new Error("Failed to sign up..",error)
    }
}

// login user 
exports.login = async (req,res,next)=>{
    try {
      const {email,password}= req.body;
      if(!email || !password)  throw new Error("Please enter valid email and password");
        const user = await prisma.user.findUnique({
            where : {
                email
            }
        })
        // when no user found
    if(!user)throw new Error("User Not Found...");
    //password miss match
    if(user.password !== password||user.email !==email){
        throw new Error("User email or password  Not matched...");
    }
    // user is there and validation
    cookieToken(user,res);
    } catch (error) {
        throw new Error("Error occur when login..",error)
    }
}

// logout user
exports.logout = async (req,res,next)=>{
    try {
        res.clearCookie('token');
        res.status(200).json({
            success : true
        })
    } catch (error) {
        throw new Error(error);
    }
}