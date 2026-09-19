import React, { useState } from "react";
import axios from 'axios'
import {useNavigate } from 'react-router-dom'
const Login = () => {

    const [form, setForm] = useState({
    
    company_description: "",
    password:""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e)  => {
     e.preventDefault();
    try{
    const response = await axios.post('http://localhost:5000/users/login', form)
   
    console.log(form);

localStorage.setItem("user_id", response.data.userId);
console.log(response.data)
navigate('/home')
    }
    catch (err){
      console.log(err)
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2>Sign In</h2>


        <div className="input-group">
          <label>Email Address</label>
          <input
            name="company_description"
            type="email"
            value={form.company_description}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            name="password"
            
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" >Login</button>
      </form>
    </div>
  )
}

export default Login
