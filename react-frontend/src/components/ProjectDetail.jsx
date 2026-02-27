import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import {jwtDecode} from "jwt-decode"


function ProjectDetail() {

    const [tasks,setTask]=useState([])
    const [newtask,setNewtask]=useState({
        title:"",
        description:"",
        assignedTo:""
    })

    const {id} = useParams()
    const [projectinfo,setprojectinfo]=useState(null)
    const user = jwtDecode(localStorage.getItem("token"))

    const iscreator = projectinfo?.infos?.createdBy?._id === user.userId

    const fetchinfo = async ()=>{
        try {
            const token = localStorage.getItem("token")

            const res= await axios.get(`http://localhost:7000/project/${id}`,{headers:{Authorization:`Bearer ${token}`}})
            setprojectinfo(res.data)
            console.log(res.data)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchinfo()
        fetchTask()
    },[id])

    const fetchTask = async () =>{
        try{
            const token = localStorage.getItem("token")
            const res=await axios.get(`http://localhost:7000/task/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setTask(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    const handletaskcreate = async()=>{
        try{
            const token = localStorage.getItem("token")
            await axios.post("http://localhost:7000/task/create",{
                projectId:id,
                ...newtask
            },
        {
            headers:{Authorization:`Bearer ${token}`}
        })
        setNewtask({title:"",description:"",assignedTo:""})
        await fetchTask()
        }
        catch(err){
            console.log(err.response?.data)
        }
    }
    const handleupdatestatus = async (taskId,status1)=>{
        try{
            const token = localStorage.getItem("token")
            await axios.put(`http://localhost:7000/task/${taskId}`,{status1},{headers:{Authorization: `Bearer ${token}`}})
            fetchTask()
        
        }catch(err){
            console.log(err)
        }
    }

    const handledelete = async (taskId)=>{
        try{
            const token = localStorage.getItem("token")
            await axios.delete(`http://localhost:7000/task/${taskId}`,{headers:{Authorization: `Bearer ${token}`}})
            fetchTask()
        }
        catch(err){
            console.log(err)
        }
    }
    
    return (
        <div>

        {!projectinfo ? (<p>no project info</p>):(            <div>
            <h4>Project Name: {projectinfo.infos.projectname}</h4>
            <p>Created By: {projectinfo.infos.createdBy.name}</p>
            <p>DeadLine: {new Date(projectinfo.infos.deadLine).toISOString().split("T")[0]}</p>
            <p>Status: {(projectinfo.infos.statusOfproject)}</p>
            </div>)
        }


        {iscreator && (
  <div style={{ marginBottom: "20px" }}>
    <h4>Create Task</h4>

    <input
      type="text"
      placeholder="Title"
      value={newtask.title}
      onChange={(e) =>
        setNewtask({ ...newtask, title: e.target.value })
      }
    />

    <input
      type="text"
      placeholder="Description"
      value={newtask.description}
      onChange={(e) =>
        setNewtask({ ...newtask, description: e.target.value })
      }
    />

    <select
  value={newtask.assignedTo}
  onChange={(e) =>
    setNewtask({ ...newtask, assignedTo: e.target.value })
  }
>
  <option value="">Unassigned</option>

  {projectinfo?.infos?.members?.map((member) => (
    <option key={member._id} value={member._id}>
      {member.name}
    </option>
  ))}
</select>

    <button onClick={handletaskcreate}>
      Add Task
    </button>
  </div>
)}
        <hr />
        <h3>Tasks</h3>
        {
            tasks.length===0 ? (<p>No Tasks Yet</p>):(
                tasks.map((task)=>(
                    <div key={task._id} style={{border:"1px solid #ccc",padding:"10px",marginBottom:"10px"}}>
                        <h4>{task.title}</h4>
                        <h4>{task.description}</h4>
                        <p>Assigned To :{task.assignedTo ? task.assignedTo.name : "Unassigned"}</p>
                        <select value={task.status1} onChange={(e)=>handleupdatestatus(task._id,e.target.value)}>
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>
                        {
                            iscreator && (<button onClick={()=>handledelete(task._id)}>Delete</button>)
                        }
                    </div>
                ))
            )
        }
        </div>
  )
}

export default ProjectDetail
