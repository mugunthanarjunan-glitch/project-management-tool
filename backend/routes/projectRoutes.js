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

module.exports = router