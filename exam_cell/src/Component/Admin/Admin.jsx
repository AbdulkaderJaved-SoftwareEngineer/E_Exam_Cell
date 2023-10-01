import {React} from 'react'
import {Alert, Box,Button,Paper, TextField, Typography} from "@mui/material";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import PreviewRequest from './PreviewRequest';
import axios from 'axios';
import AdminHeader from './AdminHeader';

function Admin() {

const [username,setUsername] = useState('')
const [password,setPassword] = useState('')
const [message,setMessage] = useState(null)
const navigate = useNavigate();








function handleLogin(e)
{   e.preventDefault();
  if(username.length  < 1 || password.length  < 1)
  {
    setMessage("Error")
  }

  else
  
  {

    axios.post("http://localhost:3001/admin/login",{
      user : username,
      pass : password
    }).then((res)=>{
      
     if(res.data === 'No Data Found')
     {
      console.log(res)
      setMessage('Warning');
     }

     else if(res.data.length > 0)
     {
      setMessage('Success')
      localStorage.setItem("adminAuth",true);
      localStorage.setItem("isAdmin",true);
      localStorage.setItem("name",username);
      navigate('/AdminDashBoard');

     }

    
    })




  }

}

  return (
<Box style={{
    
    width:'100%',
    height:'840px'

}}>
    <br/><br/><br/><br/>
&nbsp;<h1> Admin Login</h1>

<Box container
style={{
    
 
    position:'absolute',
    top:'30%',
    left:'30%',
    right:'0',
    width:'500px',
    height:'300px'
    }}>
    
    
    <Stack direction='column' spacing={2}>
    <TextField id="username" value={username}placeholder='Username' onChange={(e)=>{setUsername(e.target.value)
    }}/>

    {username}


    <TextField id="password" value={password}placeholder='Password' onChange={(e)=>{setPassword(e.target.value)
}}/>

{password}

    <Button id="login" variant="outlined" onClick={handleLogin}>Login</Button>
    <Link to="/AdminSignUp">Not Have Account? Try creating your Admin Account Now</Link>
    </Stack>
      {
        message === 'Error' ? <Alert severity='error'>Username or Password is not Entered</Alert> :<></>
      }

      {
        message === 'Success' ? <Alert severity='success'>{"Logging in...."}</Alert> : <></>
      }

      {
        message === 'Warning' ? <Alert severity='warning'>{"No Users Found"}</Alert> : <></>
      }

</Box>


</Box>
)}

export default Admin;
