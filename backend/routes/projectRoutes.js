const express = require("express")
const mongoose = require("mongoose")
const Project = require("../models/Project")
const User = require("../models/User")


const router = express.Router()

router.post("/create",async (req,res) => {
    const {projectname,statusOfproject,deadLine} = req.body

    await Project.create({projectname,statusOfproject,deadLine})

    res.json({message:"Project created successfully"})

})

module.exports = router