import React, { useEffect, useState } from "react";
import Axios from  "axios";
import Header from "./Header";
import { Alert, Grid, Typography,TextField,Button,Paper, Avatar, Divider } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import SelectInput from "@mui/material/Select/SelectInput";

function Profile(){
const [username ,setUsername] = useState("")
const [Password,setPassword] = useState("")
const [Fullname ,setFullName] = useState("")
const [RollNo ,setRollNo] = useState()
const [Mobile ,setMobile] = useState()
const [Enrollment ,setEnrollment] = useState()
const [PRN,setPRN] = useState()
const [Address,setAddress] = useState("")
const [Year,setYear] = useState()
const [Semester ,setSemester] = useState()
const [Profile,setProfileImage] = useState(null)
const [myProfile,setProfile] = useState([])
const [updateBtnDisable,setUpdateDisable] = useState(true);





// useEffect(()=>

// {
//     const user = localStorage.getItem('rollno');
//     Axios.post("http://localhost:3001/api/getProfile",{user:user})
//     .then((response)=>
//     {
//             if(response.data.length > 0)
//             {
//                 console.log(response)
//                 setProfile(response.data[0])
//             }



//       console.log(response)
//       console.log(JSON.parse(JSON.stringify(response.data)))
//     if(response.data.length === 0)
//     {
//         {<Alert title="You have not Filled the Profile yet" severity="warning"></Alert>}
//         setProfile(null)
//     }
   
 
    

      
      
      

      
//     })
// },[])









function registerData(e)

{
    e.preventDefault();
    const formdata = new FormData();
   formdata.append("RollNo",RollNo);
   formdata.append("Username",username)
   formdata.append("Password",Password)
   formdata.append("Fullname",Fullname)

   formdata.append("Mobile",Mobile)
   formdata.append("EnrollmentNo",Enrollment)
   formdata.append("PRN",PRN)
   formdata.append("Address",Address)
   formdata.append("Year",Year)
   formdata.append("Semester",Semester)
  
    formdata.append("File",Profile);
    console.log(formdfata)
    const config = {
        header : {
            "Content-Type":"multipart/form-data"
        }
    }
 Axios.post("http://localhost:3001/api/ProfileFill",

formdata,config).then((resposne)=>{
    
    if (resposne.status === 200)
    {alert("Profile Filled Successfully")
       
       
    }
}).catch((err)=>{
    console.log(err)
   

})
}


return (
<div className="Profile">
    <Header />
<br/><br/><br/>
    <h1>PROFILE</h1>
    <Paper elevation={6} 
    sx={{
        width:'600px',
        justifyContent:'center',
        marginLeft:'30%',
        
       
        borderTop:'4px solid orange'
    }}
    >


<form onSubmit={(e)=>{registerData(e)}}>
    <input type="file" name="File"  onChange={(e)=>{
        if (e.target.files && e.target.files[0])
        {   console.log(e.target.files[0])
            let img = e.target.files[0]
            setProfileImage(img)
        }
        else{
            setProfileImage(null);
        }
       
        }}/>

    
  
<Grid  container spacing={3} direction="column"  justifyContent="space-between" alignItems="center">

<Grid item m={4} >

    <TextField type="text" placeholder="Username"  name="Username"onChange={(e)=>{setUsername(e.target.value)}}/>

<TextField type="password" placeholder="Password" name="Password" onChange={(e)=>{setPassword(e.target.value)}}/>


</Grid>


<Grid item  m={3} >
<TextField type="text" placeholder="FullName"  name="Fullname" onChange={(e)=>{setFullName(e.target.value)}}/>

<TextField type="number" name="RollNo"placeholder="RollNo" onChange={(e)=>{setRollNo(e.target.value)}}/>
</Grid>

<Grid item  m={3} >
<TextField type="number" placeholder="Enrollnoment.No"  name="EnrollmentNo"onChange={(e)=>{setEnrollment(e.target.value)}}/>



<TextField type="text" placeholder="PRN"  name="PRN"onChange={(e)=>{setPRN(e.target.value)}}/>
</Grid>

<Grid item  m={2} >
<TextField maxRows={4} aria-required={true} type="text" placeholder="Address" name="Address"onChange={(e)=>{setAddress(e.target.value)}}/>


<TextField type="number"  placeholder="Mobile"  name ="Mobile" onChange={(e)=>{setMobile(e.target.value)}}/>
</Grid>
<Grid item  m={2} >
<label htmlFor="Year">Year of Study</label>
<select  name="Year" onChange={(e)=>{
    console.log(e.target.value)
    setYear(e.target.value)}}>
<option>---select----</option>
<option>2</option>
<option>3</option>
</select>
</Grid>
<Grid item  m={2} >
<label htmlFor="Semester">Current Semester</label>
<select  name="Semester" onChange={(e)=>

{console.log(e.target.value)
    setSemester(e.target.value) 
}}>
<option>---select----</option>
<option>3</option>
<option>4</option>
<option>5</option>
<option>6</option>
</select>
</Grid>




</Grid>

<Button type="submit"  variant='outlined' component="contained">Register Me</Button>&nbsp;&nbsp;
<Button type="submit"  variant='outlined' color={"secondary"} component="contained" disable={updateBtnDisable}>Update Me</Button>
</form>
</Paper>
</div>
    
)

}
export default Profile;