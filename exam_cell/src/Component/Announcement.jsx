import {React,useEffect,useState} from 'react';
import axios from "axios";
import Header from "./Header";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { CardHeader, Divider, Typography,Chip, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {MdDelete} from "react-icons/md";
import { FaEdit } from 'react-icons/fa';
import {Bars} from "react-loader-spinner"

function Announcement(props) {
const [announcements,setAnn] = useState([]);

function handleDelete(id)
{

  const confirm = window.confirm("Are you sure ,you want to delete the post "+id);

  if(confirm === true)
  {
      
    axios.post("http://localhost:3001/admin/deletePost/:id",{id:id})
  .then((response)=>{
    if(response.status === 200)
    {
      alert("Post has been deleted");
    }
  })
  }
  
}






useEffect(
()=>{
axios.get("http://localhost:3001/api/Announcement").then((res)=>{
if(res.status === 200)
{
    setAnn(res.data)
    console.log(res.data)
}
})
},[])





  return (
    <div>
    
   { props.header === 'false' ?null : <Header/>}
     <br /><br />
     <Typography variant="h2" component='h1'>Announcements</Typography>
     <Stack  direction='column' spacing={5} component="container" alignItems='center'>
  {announcements.length < 1 ? <Bars
  
  height="80"
  width="80"
  color="#2929ff"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/> : announcements &&  announcements.map((item,index)=>(
    <>
    <Divider variant='left' role="presentation"><Chip label={item.Date===null ? "No date ":item.Date}/></Divider>
<Card  key={index} style={{width:'300px' , height:'auto',borderTop:'5px solid skyblue'}}>

    <CardContent>
    
    <Typography variant='body2' component="h2"> <b>{item.AnnouncementType} </b></Typography>
    <Divider/>
    <Typography variant='subtitle'>Title : {item.Title}</Typography>
    <Divider/>
    Description <Typography variant='subtitle'> : {item.Description}</Typography>

    <Typography>Date : <b>{item.Date}</b></Typography>
    <Typography>Target Audience : <b>Sem {item.Semester}</b></Typography>
    
    </CardContent>
      <CardContent>
        <Typography subtitle="subtitle">Issued By : {item.AnnouncedBy}</Typography>
        
        
          {props.isDeleteOption==='true' && props.isUpdateOption === 'true' ? 
          
          <>
          <Tooltip title="Delete this Post">
            
          <MdDelete onClick={()=>handleDelete(item.id)}  style={{cursor:'pointer'}}/>
          </Tooltip>
           &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; 
           <Tooltip title="Edit this Post">
           <FaEdit  style={{cursor:'pointer'}}/>
           </Tooltip>
          </>
          : null}


        </CardContent>
  </Card>
</>
  
  ))}


{
  !announcements && "Loading"
}

     </Stack>
    </div>
  )
}
export default Announcement;
