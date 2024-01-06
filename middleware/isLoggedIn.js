const prisma = require("../prisma/index");
const jwt= require('jsonwebtoken');
const isloggedIn = async (req,res,next)=>{
    try {
        const token = req.cookies.token;
        console.log("token : ",token);
        if(!token){
            res.send('Please login...');
            throw new Error("You are not logged in")
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await prisma.user.findUnique({
            where:{
                id: decoded.userId
            }
        })
        // you can do more checks
        next();
    }catch (error) {
       res.json({ error: `Please Login First..` });
    }
}
module.exports =isloggedIn;