import {  Container, Tooltip, Typography,Divider,Chip } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from '@mui/material/styles';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import CloseIcon from '@mui/icons-material/Close';
import { FcCancel, FcCheckmark,FcOk, FcViewDetails } from "react-icons/fc";
import {FaCheckSquare, FaTimes} from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import Header from "../Header";
import  Axios  from 'axios';
import html2pdf from "html2pdf.js/dist/html2pdf.min";
import ReactDOMServer from 'react-dom/server';
import PreviewRequest from './PreviewRequest';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import {flushSync} from "react-dom";
import { useNavigate,Link } from 'react-router-dom';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 400,
  }));
function AdminRequestCard(props) 
{
const [user,setUser] = useState([]);
const username = localStorage.getItem('name');
const navigate = useNavigate();

function handleApprove(options)
{
  let decide=window.confirm("Are you sure want to approve this examform for id : "+options)
if(decide === true)

{
  Axios.put("http://localhost:3001/api/approveUpdateStatus",{id : options,username:username}).then((response)=>{
    console.log("approved",response)
    if(response.status === 200)
    {
      alert("Examform No : "+options+" has been approved")
    }
  })
}
else
{
return 
}
}





function handleReject(options)
{
  let decide=window.confirm("Are you sure want to reject this examform for id : "+options)
if(decide === true)

{
  let comments  = window.prompt("Write your comments ..")
  alert(comments)
  Axios.put("http://localhost:3001/api/rejectUpdateStatus",{Comments:comments,id : options,username:username}).then((response)=>{
    console.log("rejected",response)
    if(response.status === 200)
    {
      alert("Examform No : "+options+" has been rejected")
    }
  })
}

}

const Pdf =  () =>
{
  return(
  <div className='Pdf'>
  <Container >
<center>E-Exam Cell</center>
<Typography>Examform Id : {user.ExamFormId}</Typography>
<Typography>Fullname : {user.Fullname}</Typography>
<br />
<Typography>RollNo : {user.RollNo}</Typography>
<br/>
<Typography>Examform Status : {user.ExamFormStatus}</Typography>
<br/>
<Typography>Comments : {user.Comments}</Typography>
<br/>






</Container>

  
  
  
  </div>
    )
}





//PDF form  of the Examform
 function HandleView(options)
{
  console.log(options)
navigate(`/PreviewRequest/${options}`)
}





//----------------------------------->

  return (
    <div>
     <Container container  gap={2} alignContent="center" alignItems="center" direction="row">


     <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3,height:'auto',width:'300px' }} 
    
     >

    <Grid item direction="column"  gap={2} alignContent="center" textAlign="left">
      <Item
        sx={{
          my: 4,
          mx: 'auto',
          p: 3,
          borderTop:'4px solid blue',
          cursor:'pointer',
          ":hover":"translateX(-50%)",
        }}
      >
     <Grid alignContent="center" container textAlign='left' direction="column">
      
       <Grid container direction="row">
       
       <Avatar src={props.photo} alt={props.fullname} sx={{ bgcolor: deepPurple[500],
        width: 70, height: 70        
        }}   variant='rounded'/>
<Typography flexGrow={1}variant='h2' textAlign="right">
  <span><Typography variant='body2'>Exam Form No.</Typography></span>{props.number}</Typography>
       </Grid>
       


<Grid item>
<b><Typography variant="h6"> {props.fullname}</Typography>
</b>
</Grid>

<Grid item>
<Typography variant='h5'>{props.status}</Typography>

<Tooltip title="Approve">
<IconButton aria-label='Approve'>
  
  <FcCheckmark onClick={()=>{handleApprove(props.number)}}/>
</IconButton>


</Tooltip>


<Tooltip title="Reject"  aria-label='Reject'>
<IconButton>
  <FcCancel onClick={()=>{handleReject(props.number)}}/>
</IconButton>
</Tooltip>



<Tooltip title="View Application Form"  aria-label='View'>
<IconButton>
  <Link to={`/PreviewRequest/${props.number}`}> <GrFormView /> </Link>
</IconButton>
</Tooltip>
</Grid>





     </Grid>
      </Item>
      </Grid>
     
    </Box>
    </Container>
    
    </div>
  )
}

export default AdminRequestCard
