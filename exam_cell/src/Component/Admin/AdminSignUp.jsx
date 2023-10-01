import React, { useState } from 'react'
import { TextField,Button,Typography, Stack } from '@mui/material';
import Box from "@mui/material/Box";

import Grid from '@mui/material/Grid';

function AdminSignUp() {
const [id ,setId] = useState()
const [username,setUsername] = useState("")
const [password,setPassword] = useState("")
const [name ,setName] = useState('')
const [mobile,setMobile] = useState()
const [image,setImage] = useState("")

const [designation,setDesignation] = useState("")
    function handleSignUp()
    {
  
    }
  return (
    <Box 
    style={{
    
 border:"1px solid black",
        position:'absolute',
        top:'20%',
        left:'20%',
        right:'0',
        width:'500px',
        height:'300px',
        justifyContent:'center',
        alignItems:'center',
        
        }}
    
    >

<b> <Typography variant='h3'>Want to Create an Account ?  </Typography></b>


 <Stack direction="row" spacing={2}> 
    <TextField/>
    <TextField/>

 </Stack>

</Box>
  )
}

export default AdminSignUp
