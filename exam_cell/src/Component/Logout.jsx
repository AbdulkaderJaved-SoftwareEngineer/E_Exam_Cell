import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function Logout() {
  const navigate = useNavigate()
useEffect(()=>{
    localStorage.removeItem('auth');
    localStorage.removeItem('name');
    localStorage.removeItem('rollno');
    navigate('/Login');
})  

    return (
    <div>
      Logged Out
    </div>
  )
}

export default Logout;
