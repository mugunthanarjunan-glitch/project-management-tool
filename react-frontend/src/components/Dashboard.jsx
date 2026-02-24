import React, { useState,useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "../components/Dashboardstyle.css";
import ProjectCreateform from "./ProjectCreateform";
import axios from "axios";
import {useNavigate} from "react-router-dom"


function Dashboard() {
  const navigator = useNavigate()
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : "null";
  const [showform, setshowform] = useState(false);
  const [projectlist1,setprojectlist]=useState([])
  const fetchprojects = async ()=>{

      try{
        const token=localStorage.getItem("token")
        const res = await axios.get("http://localhost:7000/project/list",{headers: {
          Authorization: `Bearer ${token}`
        }})
        setprojectlist(res.data.projectlist)
        
      }
      catch(err){
        console.log(err)
      }
  }

  if (projectlist1){
    console.log(projectlist1[0])
  }
  useEffect(() => {
  fetchprojects()
}, [])
  return (
    <>
      <div className="Dashboard-container">
        <div>
          <h1>Welcome to dashboard{user.name}</h1>
        </div>
        <div className="Dashboard-area">
          <div className="Dashboard-sidebar">
            <h6>this is side bar</h6>
          </div>

          <div className="Dashboard-projectarea">
            <h4>this is the project main area</h4>
            <button onClick={() => setshowform(true)}>Create project</button>
            {showform && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <ProjectCreateform closeform={() => (setshowform(false),fetchprojects())} />
                </div>
              </div>
            )}
            <div className="Project-cards">

            { projectlist1.length ===0 ? (
              <p>No projects yet</p>
            ):(projectlist1.map((Element)=>(
              <div key={Element._id} className="card" onClick={()=> navigator(`/project/${Element._id}`)}>
                <h3>Project Name: {Element.projectname}</h3>
                <p>Created By: {Element.createdBy.name}</p>
                <p>Created At: {Element.startAt.split("T")[0]}</p><p> DeadLine: {new Date(Element.deadLine).toISOString().split("T")[0]}</p>
                <p>Status: {Element.statusOfproject}</p>
              </div>
            )))
          }
          </div>
          

          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
