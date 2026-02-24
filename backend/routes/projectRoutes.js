const express = require("express")
const mongoose = require("mongoose")
const Project = require("../models/Project")
const User = require("../models/User")
const projectCheck = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/create",projectCheck,async (req,res) => {
    try{
        const {projectname,statusOfproject,deadLine} = req.body
        
        const proinfo = await Project.create({projectname,statusOfproject,deadLine,createdBy:req.user.userId})
        
        res.json(proinfo)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

router.get("/list",projectCheck,async (req,res)=>{
    const projectlist = await Project.find({createdBy:req.user.userId}).populate("createdBy","name email")
    res.json({projectlist})
})

router.get("/:id",projectCheck,async (req,res)=>{
    try{
        const infos= await Project.findOne({
            _id:req.params.id,
            createdBy:req.user.userId
        }).populate("createdBy","name email")

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