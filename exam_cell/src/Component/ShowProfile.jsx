import React, { useEffect } from 'react'
import { useState } from 'react'
import Axios from "axios";
import MyAvatar from '../images/Abdulkader_19818.jpg';
import Container from "@mui/material/Container";
import { Stack,Grid, TextField, Input,Divider,Typography,Paper, Chip, Avatar,Alert} from '@mui/material';
import Header from "./Header";
import { useNavigate } from 'react-router-dom';
function ShowProfile() {
const [getProfile,setProfile] = useState([]);
const navigate = useNavigate();
  useEffect(
  ()=>
  {
    const user = localStorage.getItem('rollno');
    Axios.post("http://localhost:3001/api/getProfile",{user:user}).then((response)=>
    {
      console.log(response)
      console.log(JSON.parse(JSON.stringify(response.data)))
       setProfile(response.data[0])

   if(response.data.length === 0 )
   {
      setProfile(null)
      alert("You have not yet filled the Profile")
      navigate('/Profile')
      
   }
   
   
      
      
      

      
    })
  
      
     
  },[])

return (
<div className="showProfile"
style={
{
  width: '99%',
  height: '100%',
background:'#eeeeee',


}

}

>
<Container >
  <Header />
<Stack container direction="column" rowSpacing={3}
rowGap={4} alignItems="left" alignContent="left"> 

<Divider variant='middle'>Your Avatar</Divider>
<Stack item alignItems="left">
<div className='profile-avatar'
style={{
  
  width:'auto',
  height: 'auto',
  alignItems:'center',
  justifyContent:'center',
  left:'50%',
  textAlign:'center'
}}

>

<Stack container direction="row" alignItems='center' gap={3}>
<Stack item> 

<Avatar src={`http://localhost:3001/images/${getProfile.Profile}`} alt='Abdulkader'
 sx={{ width: 200, height:200}}
 style={{border:'3px solid black',boxShadow:'0px 0px 10px'}}
 
 />
</Stack>

<Stack item>
<h1>{getProfile.Fullname} </h1>
</Stack>
 
 </Stack>

 
</div>
</Stack>




{/* {Profile section} */}
<Divider variant='left' role="presentation"><Chip label="Personal Info"/></Divider>

<Stack item alignItems="left">
  <Paper>
<div className='personal-info'
style={{
background:"transparent",
  height:"auto"
}}>
 
  <Grid container   direction="row" rowSpacing={3}>
  <Grid item xs={4} >
    <h4>FullName</h4>
    <Divider variant='middle'/>
  </Grid>

  <Grid item xs={4}>
    <h4>RollNo</h4>
    <Divider variant='middle'/>
  </Grid>
  <Grid item xs={4} >
    <h4>Address</h4>
    <Divider variant='middle'/>  
  </Grid>
  
 


<Grid container   direction="row">
  <Grid item xs={4} >
    <h4>{getProfile.Fullname}</h4>
  </Grid>

  <Grid item xs={4} >
    <h4>{getProfile.RollNo}</h4>
  </Grid>
  <Grid item xs={4} >
    <h4>{getProfile.Address}</h4>
  </Grid>
  <br/><br/>

  
  <Grid item xs={4} >
    <h4>Enrollment No</h4>
    <Divider variant='middle'/>
  </Grid>

  <Grid item xs={4}>
    <h4>Mobile No</h4>
    <Divider variant='middle'/>
  </Grid>
  <Grid item xs={4} >
    <h4>PRN</h4>
    <Divider variant='middle'/>  
  </Grid>


  <Grid item xs={4} >
    <h4>{getProfile.EnrollmentNo}</h4>
    <Divider variant='middle'/>
  </Grid>

  <Grid item xs={4}>
    <h4>{getProfile.Mobile}</h4>
    <Divider variant='middle'/>
  </Grid>
  <Grid item xs={4} >
    <h4>{getProfile.PRN}</h4>
    <Divider variant='middle'/>  
  </Grid>


</Grid>
</Grid>
</div>
</Paper>
</Stack>




{/* Academic Section */}
<Divider><h3>Academic Details</h3></Divider>
<Stack item alignItems="left">
  <Paper elevation={2}>
<div className='academic-section'
style={{
  background:'transparent',
  height:"auto"
}}>
  
 

<Grid container   direction="row">
  <Grid item xs={4} >
    <h4>Semester</h4>
    <Divider variant='middle'/>
  </Grid>

  <Grid item xs={4}>
    <h4>Year</h4>
    <Divider variant='middle'/>
  </Grid>
  <Grid item xs={4} >
    <h4>Course</h4>
    <Divider variant='middle'/>
  </Grid>



<Grid container   direction="row">
  <Grid item xs={4} >
    <h4>{getProfile.Semester}</h4>
  </Grid>

  <Grid item xs={4} >
    <h4>{getProfile.Year}</h4>
  </Grid>
  <Grid item xs={4} >
    <h4>Information and Technology</h4>
  </Grid>


</Grid>
</Grid>


  
  




</div>
</Paper>
</Stack>



</Stack>
</Container>




</div>




  )
}
  export default ShowProfile;
