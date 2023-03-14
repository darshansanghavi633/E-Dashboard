import React from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.clear();
    navigate("/signup")

  }
  return (
    <div>
      <img alt='logo' className='logo' src='https://assets.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e3a57bdb3717fbf9cec_Product_Default.svg'></img>
       {auth ?
      <ul className='nav-ul'>
        <li><Link to="/">Product</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        <li><Link to="/update">Update Product</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
      </ul>
        :
        <ul className='nav-ul nav-right'>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        }
    </div>
  )
}
