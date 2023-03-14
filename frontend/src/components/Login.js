import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email,setEmail]=React.useState('');
  const [password,setPassword]=React.useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
      navigate('/')
    }
  });


  const handleLogin=async()=>{
    console.log(email,password);
    let result = await fetch("http://127.0.0.1:5000/login",{
          method:"post",
          body:JSON.stringify({email,password}),
          headers:{
            'Content-Type':'application/json'
          },
        })
        result = await result.json();
        localStorage.setItem("user",JSON.stringify(result.user));
        localStorage.setItem("token",JSON.stringify(result.auth));
        console.log(result);
        if (result.auth) {
          navigate("/");
        }else{
          alert("enter valid login credentials");
        }
  }
  return (
    <div className='login'>
      <h1>Login</h1>
      <input type="text" value={email} placeholder='Enter Email' className='inputBox' onChange={(e)=>setEmail(e.target.value)}></input>
      <input type="password" value={password} placeholder='Enter Password' className='inputBox' onChange={(e)=>setPassword(e.target.value)}></input>
      <button className='appbutton' type='button' onClick={handleLogin}>Sign Up</button>
    </div>
  )
}
