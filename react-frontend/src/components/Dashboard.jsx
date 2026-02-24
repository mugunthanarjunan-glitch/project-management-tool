import React, { useState,useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "../components/Dashboardstyle.css";
import ProjectCreateform from "./ProjectCreateform";
import axios from "axios";

function Dashboard() {
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : "null";
  const [showform, setshowform] = useState(false);
  const [projectlist1,setprojectlist]=useState([])
  const projectlistdetail=[]
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
              <div key={Element._id} className="Project-card">
                <h1>Project Name{Element.projectname}</h1>
                <p>Created At{Element.startAt}</p><p>DeadLine{Element.deadLine}</p>
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
