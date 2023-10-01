import React from 'react'
import AdminHeader from './AdminHeader';
import { Box, TextField, TextareaAutosize, Typography,Button,Checkbox,ListItem,MenuItem,ListItemText,Select, Divider } from '@mui/material';
import {useState} from "react";
import { FcAbout, FcBookmark, FcCancel,FcExpand,FcOk } from "react-icons/fc";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from '@mui/material/Stack';
import axios from "axios";
import Grid from "@mui/material/Grid";
import Announcement from "../Announcement"
import {TfiAnnouncement} from "react-icons/tfi";
function MakeAnnouncement() {
const [title,setTitle] = useState("")
const [description,setDescription] = useState("")
const [semester,setSemester] = useState("")
const [type,setType] = useState("");
const id = localStorage.getItem('name');
const handleAnnounce = (e) =>{

e.preventDefault();




axios.post("http://localhost:3001/admin/announcements",{type:type,title:title,description:description,semester:semester,id:id})
.then((response)=>{
  console.log("Announced : "+response);

  if(response.status === 200)
  {
    alert("New post submitted");
  }
else{
  alert("Some error occurred try again later ")
}
}) 
}


const handleChange = (e) => 
{
  setType(e.target.value);
  
}


const handleSemChange = (e) =>{
  setSemester(e.target.value);

}
  return (
    <div>
      <AdminHeader/>

      <form onSubmit={(e)=>{handleAnnounce(e)}}>
      <Box variant="container" >
        <Stack direction="column" spacing={2} width="500px" marginLeft='40%' marginTop='10%'>
          <Typography variant="h4">Make Announcements</Typography>
          <Select
sx={{m:1,width:500}}
onChange={(e)=>{handleChange(e)}}
value={type || ""}
placeholder="Select"
>


<MenuItem value="Notice">

   <TfiAnnouncement/> &nbsp;&nbsp;&nbsp; <ListItemText primary="Notice" />
   
</MenuItem>

<MenuItem value="Scholarship Announcement">
<ListItemText primary="Scholarship Announcement" />
</MenuItem>

<MenuItem value="Internship Announcement">
<ListItemText primary="Internship Announcement" />
</MenuItem>
<MenuItem value="Lecture and Presentation">
<ListItemText primary="Lecture and Presentation Announcement" />
</MenuItem>

<MenuItem value="Meeting and Discussion Announcement">
<ListItemText primary="Meeting and Discussion Announcement" />
</MenuItem>
<MenuItem value="Seminar Announcement">
<ListItemText primary="Seminar Announcement" />
</MenuItem>



</Select>
      <TextField id="Title"  placeholder="Title.." onChange={(e)=>{setTitle(e.target.value)}} />
      <TextareaAutosize id="Description"  placeholder="Description.." onChange={(e)=>{setDescription(e.target.value)}} />

  <Select
sx={{m:1,width:500}}
onChange={(e)=>{handleSemChange(e)}}
value={semester || ""}
placeholder="Select"
>

<MenuItem value="F.E">
<ListItemText primary="F.E" />
</MenuItem>

<MenuItem value="S.E">
<ListItemText primary="S.E" />
</MenuItem>

<MenuItem value="T.E">
<ListItemText primary="T.E" />
</MenuItem>

<MenuItem value="B.E">
<ListItemText primary="B.E" />
</MenuItem>


</Select>



      <Button variant='contained' type='submit' fullWidth="false" style={{width:"100px"}}>Annouce</Button>
      </Stack>
      </Box>
      </form>
      
<Divider/>
<br />
<Grid container direction='row'>

<Grid item style={{marginLeft:'30%'}}> 


<Announcement isDeleteOption="true" isUpdateOption="true" header='false' />

</Grid>



</Grid>

    </div>
  )
}

export default MakeAnnouncement;
