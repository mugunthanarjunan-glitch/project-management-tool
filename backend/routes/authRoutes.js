const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/User")

const router = express.Router()

router.post("/register", async (req,res)=>{
    const {name,email,password}=req.body
    const hashedpassword = bcrypt.hashedpassword(password)

    await User.create({name,email,password:hashedpassword})

    res.json({message:"user created successfully"})
})

module.exports = router