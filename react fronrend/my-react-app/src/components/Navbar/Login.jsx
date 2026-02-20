import React, { useState } from "react";
import "./Login.css";
import logo from "../right.webp"; // put your logo in src/assets

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();   // prevents page refresh
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="container">

      {/* LEFT SIDE */}
      <div className="left">
        <h1>Hello,<br />Welcome Back</h1>
        <p className="subtitle">
          Hey, welcome back to your special place
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="options">
            <label>
              <input type="checkbox" defaultChecked />
              Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit">Sign In</button>

          <p className="signup">
            Don't have an account?
            <a href="#"> Sign Up</a>
          </p>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="right"></div>

    </div>
  );
}

export default Login;