import React from 'react'
import { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function SignUp() {
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const navigate = useNavigate();
    
useEffect(()=>{
      const auth = localStorage.getItem('user');
      if(auth){
        navigate("/");
      }
    })

    const collectData= async ()=>{
        console.log(name,email,password);
        let result = await fetch("https://e-dashboard-darshansanghavi.onrender.com/signup",{
          method:"post",
          body:JSON.stringify({name,email,password}),
          headers:{
            'Content-Type':'application/json'
          },
        })
        result = await result.json();
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
        console.log(result);
        if (result) {
          navigate("/");
        }
        
    }
  return (
    <div className='register'>
      <h1>Sign Up</h1>
      <input type="text" className="inputBox" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}/>
      <input type="email" className="inputBox" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" className="inputBox" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button className='appbutton' type='button' onClick={collectData}>Sign Up</button>
    </div>
  )
}
