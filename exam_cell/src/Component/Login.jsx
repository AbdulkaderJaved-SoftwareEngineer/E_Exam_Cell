import React, { useEffect, useState } from "react";
import Header from "./Header"
import  {Link, useNavigate} from  "react-router-dom";
import { Typography} from "@mui/material"
import Axios from "axios"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Login(){
useEffect(()=>{
  if(localStorage.getItem('auth'))
  {
    navigate('/DashBoard')
  }



})
const [username ,setUsername] = useState("")
const [password,setPassword] = useState("")
const navigate = useNavigate()
function validateLogin(e){
  e.preventDefault();
  Axios.post("http://localhost:3001/api/login",{
    username:username,
    password:password
  }).then((res)=>{
  console.log(res)
  if(res.data.Login)
  { 
    
    
  localStorage.setItem('auth',true)
  localStorage.setItem('name',res.data.data)
  localStorage.setItem('rollno',res.data.rollno)
    console.log(res.data.data)
    navigate('/DashBoard')
    

  }
  else
  {
    
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">Wrong Username or Password ! Please Try Again for Login</Alert>
     
    </Stack>

    )
  }
    
  }).catch((err)=>{
    alert("Invalid Credentials")
  })
}
return (<>
<Header />
<br />
<br />


<div className="login">
   
    <Typography variant="h4" align="center"> Login</Typography>

    
<br />
<br />



<form onSubmit={validateLogin}>
{/*     
<input id ="Username" type="text" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}} required/>

<input type="password" id="Password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} required/> */}


<Box component="form"sx={{'& > :not(style)': { m: 1, width: '25ch' },}}noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e)=>{setUsername(e.target.value)}}/>

<br />
      <TextField id="outlined-basic" type="password"label="Password" variant="outlined" onChange={(e)=>{setPassword(e.target.value)}}/>
    
    </Box>









<Button type="submit" variant="contained">Login</Button>
<br />
<Link to="/SignUp">No Have Account? Register Now</Link>
<br/>
<Link to="/Admin">Admin</Link>
</form>
</div>
</>
)

}
export default Login;