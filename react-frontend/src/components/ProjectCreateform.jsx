import axios from "axios";
import React, { useState } from "react";

function ProjectCreateform({ closeform }) {
  const [projectform, setProjectform] = useState({
    projectname: "",
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

  return (
    <form method="post" onSubmit={handleSubmit}>
      Project Name{" "}
      <input type="text" name="projectname" onChange={handleChange} />
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
