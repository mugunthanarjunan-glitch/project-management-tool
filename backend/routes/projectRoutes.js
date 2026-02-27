const express = require("express")
const mongoose = require("mongoose")
const Project = require("../models/Project")
const User = require("../models/User")
const projectCheck = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/create",projectCheck,async (req,res) => {
    try{
        const {projectname,members,statusOfproject,deadLine} = req.body
        
        const proinfo = await Project.create({projectname,members,statusOfproject,deadLine,createdBy:req.user.userId})
        
        res.json(proinfo)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

router.get("/list",projectCheck,async (req,res)=>{
    try{
        const userId=req.user.userId
        const projectlist = await Project.find({$or:[{createdBy:userId},{members:userId}]}).populate("createdBy","name email").populate("members","name email")

        res.json({projectlist})

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

router.get("/search-user",projectCheck,async (req,res)=>{
    try{
        const {email}=req.query

        if(!email){
            return res.status(400).json({message:"Email require"})
        }
        const users = await User.find({
            email:{$regex:email,$options:"i"}
        }).select("name email").limit(5)
        res.json(users)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

router.get("/:id",projectCheck,async (req,res)=>{
    try{
        const userId =req.user.userId
        const infos= await Project.findOne({
            _id:req.params.id,
            $or:[{
                createdBy:userId},{members:userId}]
        }).populate("createdBy","name email").populate("members","name email")

        if (!infos){
            return res.status(404).json({message:"Project not found"})
        }
        res.json({infos})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})




module.exports = router