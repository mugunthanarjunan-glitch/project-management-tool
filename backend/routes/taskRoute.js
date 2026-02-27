const express = require("express")
const router = express.Router()
const Task = require("../models/Task")
const Project = require("../models/Project")
const projectCheck = require("../middleware/authMiddleware")

router.post("/create",projectCheck,async (req,res)=>{
    try{
        const {projectId,title,description,assignedTo}=req.body
        const project = await Project.findById(projectId)

        if(!project){
            return res.status(404).json({message:"Project not found"})
        }
        if(project.createdBy.toString()!==req.user.userId){
            return res.status(403).json({message:"only Creator is allowed to create tasks"})
        }
        const task = await Task.create({
            title,
            description,
            project:projectId,
            assignedTo
        })

        res.json(task)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

router.get("/:projectId",projectCheck,async(req,res)=>{
    try{
        const project= await Project.findById(req.params.projectId)
        if (!project) {
  return res.status(404).json({ message: "Project not found" })
}
        const creator = project.createdBy.toString() === req.user.userId

        const ismember = project.members.map(id =>id.toString()).includes(req.user.userId)

        if(!creator && !ismember){
            return res.status(403).json({message:"Access Denied"})
        }

        const tasks= await Task.find({project:req.params.projectId})
            .populate("assignedTo","name email")

        res.json(tasks)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

router.put("/:taskId", projectCheck, async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId)

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    const project = await Project.findById(task.project)

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    const creator = project.createdBy.toString() === req.user.userId
    const isMember = project.members
      .map(id => id.toString())
      .includes(req.user.userId)

    if (!creator && !isMember) {
      return res.status(403).json({ message: "Access Denied" })
    }

    if (creator) {
      task.title = req.body.title ?? task.title
      task.description = req.body.description ?? task.description
      task.assignedTo = req.body.assignedTo ?? task.assignedTo
      task.status1 = req.body.status1 ?? task.status1
    } else {
      if (task.assignedTo?.toString() !== req.user.userId) {
        return res.status(403).json({ message: "You can only update your assigned tasks" })
      }

      task.status1 = req.body.status1
    }

    await task.save()
    res.json(task)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete("/:taskId",projectCheck,async (req,res)=>{
    try {
        const task = await Task.findById(req.params.taskId)
        const project = await Project.findById(task.project)
        if (!task) {
  return res.status(404).json({ message: "Task not found" })
}
        if(project.createdBy.toString()!==req.user.userId){
            return res.status(403).json({message:"only creator can delete task"})
        }
        await task.deleteOne()
        res.json({message:"Task deleted"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

module.exports = router