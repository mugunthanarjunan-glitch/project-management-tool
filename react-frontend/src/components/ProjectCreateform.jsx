import axios from "axios";
import React, { useState } from "react";
import "../components/Dashboardstyle.css"
function ProjectCreateform({ closeform }) {
  
  
  const [email,setEmail]=useState("")
  const [suggestions,setSuggestions]=useState([])
  const [projectform, setProjectform] = useState({
    projectname: "",
    members:[],
    statusOfproject: "Started",
    deadLine: "",
  });

  const handleChange = (e) => {
    setProjectform({ ...projectform, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:7000/project/create",
        projectform,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Project created successfully");
      closeform();
    } catch (err) {
      console.log(err.response?.data);
      alert("Project creation failed");
    }
  };

  const searchusers = async(va)=>{
    try{
      const token = localStorage.getItem("token")
      const res= await axios.get(`http://localhost:7000/project/search-user?email=${va}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setSuggestions(res.data)
    }
    catch(err){
      console.log(err.response.data)
    }

  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      Project Name{" "}
      <input type="text" name="projectname" onChange={handleChange} />
      <div className="member-search">
  <input
    type="text"
    placeholder="Search member by email"
    value={email}
    onChange={(e) => {
      const va = e.target.value
      setEmail(va)
      if (va.length > 1) {
        searchusers(va)
      } else {
        setSuggestions([])
      }
    }}
  />

  {suggestions.length > 0 && (
    <div className="dropdown">
      {suggestions.map((user) => (
        <div
          key={user._id}
          className="dropdown-item"
          onClick={() => {
  setProjectform(prev => ({
    ...prev,
    members: [...prev.members, user._id]
  }))
  setEmail("")
  setSuggestions([])
}}
        >
          {user.name} - {user.email}
        </div>
      ))}
    </div>
  )}
</div>

      Status{" "}
      <select name="statusOfproject" id="" onChange={handleChange}>
        <option value="Started">Started</option>
        <option value="In Progress">In progress</option>
        <option value="Completed">Completed</option>
      </select>
      DeadLine <input type="date" name="deadLine" onChange={handleChange} />
      <button type="submit">Create</button>
    </form>
  );
}

export default ProjectCreateform;
