const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const router = express.Router()
router.post("/register", async (req,res)=>{
    const {name,email,password}=req.body
    const hashedpassword = await bcrypt.hash(password,10)

    await User.create({name,email,password:hashedpassword})

    res.json({message:"user created successfully"})
})

router.post("/login", async (req,res) =>{
    const {email,password}=req.body

    const user= await User.findOne({email})

    if(!user){
        return res.status(400).json({message:"User not found"})
    }

    const match = await bcrypt.compare(password,user.password)

    if(!match){
       return res.status(400).json({message:"Wrong Password"})
    }

    const token = jwt.sign({userId:user._id,name:user.name,email
        :user.email},process.env.JWT_KEY,{
        expiresIn:"1d"
    })

    res.json({message:"Login successful","token":token})

})


module.exports = router