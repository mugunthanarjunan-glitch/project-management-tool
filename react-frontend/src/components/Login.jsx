import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../components/Loginstyle.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Login() {
  const navigator = useNavigate()

  const [formdata,setFormdata]=useState({
    email:"",
    password:""
  })

  const handleChange = (e)=>{
    setFormdata({
      ...formdata,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try{
      const res = await axios.post("http://localhost:7000/auth/login",formdata)
      alert(res.data.message)
      if(res.data.token){
        localStorage.setItem("token",res.data.token)
        navigator("/dashboard")
      }
    }
    catch(err){
      console.log(err)
      alert("Login failed")
      setFormdata({
      email:"",
      password:""
    })
    }
  }
  return (
    <form action="" method="post" onSubmit={handleSubmit} className='Login-form'>
      Email <input value={formdata.email} type="email" name='email' onChange={handleChange}/>
      Password <input value={formdata.password} type="text" name='password' onChange={handleChange}/>
      <button type='submit'>Login</button>
      <span>Don't have accout? <Link to="/register">Register</Link></span>
    </form>
  )
}

export default Login
