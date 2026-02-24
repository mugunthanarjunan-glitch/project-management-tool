import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"

function ProjectDetail() {
    const {id} = useParams()
    const [projectinfo,setprojectinfo]=useState([])
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
    },[])
    
    return (
        <div>

        {projectinfo.length===0 ? (<p>no project info</p>):(            <div>
            <h4>Project Name: {projectinfo.infos.projectname}</h4>
            <p>Created By: {projectinfo.infos.createdBy.name}</p>
            <p>DeadLine: {projectinfo.infos.deadLine}</p>
            <p>Status: {projectinfo.infos.statusOfproject}</p>
            </div>)
        }
        </div>
  )
}

export default ProjectDetail
