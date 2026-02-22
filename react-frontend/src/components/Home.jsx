import React from 'react'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <div>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </ul>
    </div>
  )
}

export default Home
