const jwt = require("jsonwebtoken")

const projectCheck = (req,res,next) =>{
    const token = req.headers.authorization

    if(!token){
       return res.status(401).json({message:"Not authorized"})
    }

    try{
        const decode = jwt.verify(token.split(" ")[1],process.env.JWT_KEY)
        req.user = decode
        next()
    }
    catch(error){
        res.status(401).json({message:"Invalid token"})
    }
}

module.exports = projectCheck