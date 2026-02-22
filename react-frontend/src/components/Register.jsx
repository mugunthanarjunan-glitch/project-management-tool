import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../components/Registerstyle.css'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate=useNavigate()
  const [formdata,setFormdata]=useState({
    name:"",
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
      const res = await axios.post("http://localhost:7000/auth/register",formdata)

      alert(res.data.message)

      navigate("/login")
    }
    catch(err){
      console.log(err)
      alert("Registration failed")
      setFormdata({
    name:"",
    email:"",
    password:""
  })
    }
  }

  return (
    <form onSubmit={handleSubmit} className='Register-form'>
      Name <input value={formdata.name} type="text" name='name' required onChange={handleChange}/>
      Email <input value={formdata.email} type="email" name='email' required onChange={handleChange}/>
      Password <input value={formdata.password} type="text" name='password' required onChange={handleChange}/>
      <button type='submit'>Register</button>
      <span>Already have accout? <Link to="/login">Login</Link></span>
    </form>
  )
}

export default Register
