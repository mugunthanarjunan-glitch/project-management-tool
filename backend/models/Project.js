const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    projectname:{type:String,required:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    members:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    statusOfproject:{type:String,enum:["Started","In Progress","Completed"],default:"Started"},
    startAt:{type:Date,default:Date.now},
    deadLine:{type:Date}
})

module.exports = mongoose.model("Project",projectSchema)