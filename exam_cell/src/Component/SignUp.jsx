import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
function SignUp() {

  useEffect(()=>{
    if(localStorage.getItem('auth'))
    {
        navigate('/DashBoard');
    }
  })
const [email,setEmail] = useState('')
const [username , setUsername] = useState('')
const [password , setPassword] = useState('')
const [rollno , setRollNo] = useState('')
const navigate = useNavigate()

function handleSignUp()
{
  Axios.post("http://localhost:3001/api/signup",
  {
      
      Username : username,
      Password : password,
      Email:email,
      RollNo:rollno
      
  
  }).then((res)=>{
    console.log(res.status===200)
alert(res.status)
navigate('/Login');
  })
  }






  return (
    <div>
      <Header />
      <Box>

        <br />
        <br />
        <br />
    <b> <Typography variant='h3'>Create Account</Typography></b>
      <label htmlFor="email">Email :</label>
      <br />
      <TextField variant='outlined' type="email" label="email" name="Username" onChange={(e)=>{
        setEmail(e.target.value)
        console.log(e.target.value)
      }} />
    
    <br />

    <label htmlFor="Rollno">Rollno :</label>
      <br />
      <TextField variant='outlined' type="text" label="RollNo" name="RollNo" onChange={(e)=>{
        setRollNo(e.target.value)
        console.log(e.target.value)
      }} />
<br />

    <label htmlFor="Username">Username</label>
    <br />
      <TextField variant='outlined' label="Username" name="Username"
      onChange={(e)=>{
        setUsername(e.target.value)
        console.log(e.target.value)
      }}
      />
      <br />
      
      
      
      
      <label htmlFor="password">Password</label>
      <br />
      <TextField variant='outlined' type="password" label="Password" name="Password"
      onChange={(e)=>{
        setPassword(e.target.value)
        console.log(e.target.value)
      }}
      />
      <br />
      <br />
    <Button variant='contained' onClick={handleSignUp}>  Sign Up</Button>
    </Box> </div>
  )
}

export default SignUp;
