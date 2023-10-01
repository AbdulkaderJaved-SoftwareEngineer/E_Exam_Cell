import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRouter(props) {
const {Component} = props;
const navigate = useNavigate()
useEffect(()=>{
  let login = localStorage.getItem('auth');
  if(!login)
  {
    navigate("/Login");
  }
  
});
  return (
    <div>
   <Component />
    </div>
  )
}

export default ProtectedRouter;
