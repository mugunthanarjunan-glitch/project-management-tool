const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status1:{
        type:String,
        enum:["Pending","In Progress","Completed"],
        default:"Pending"
    }
},{timestamps:true})

module.exports = mongoose.model("Task",taskSchema)
