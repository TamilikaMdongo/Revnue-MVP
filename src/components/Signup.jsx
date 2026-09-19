import React, { useState } from "react";
import axios from 'axios'
import {useNavigate, } from 'react-router-dom'


const API_URL = "https://revnue-mvp.onrender.com"
const Signup = () => {
  const [form, setForm] = useState({
    first_name: "",
    company_name: "",
    company_description: "",
    password: ""
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
    const response = await axios.post(`${API_URL}/users`, form)
   console.log(response.data)
    console.log(form);


navigate('/login')
    }
    catch (err){
      console.log(err)
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2>Create your account</h2>

        <div className="input-group">
          <label>Full Name</label>
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>

        <div className="input-group">
          <label>Company Name</label>
          <input
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
            placeholder="Enter your company name"
          />
        </div>

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

        <button type="submit" >Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;