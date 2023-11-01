import DashBoardCard from './DashBoardCard';
import React, { useEffect } from 'react'
import Header from "./Header"
import {useHistory,useState} from "react";
import {Paper,Container, Typography, Grid, Box} from "@mui/material";
import FeesRequestTable from './FeesRequestTable';
import {Divider} from '@mui/material';
import { FaRupeeSign } from 'react-icons/fa';
function DashBoard() {
  const user = localStorage.getItem('rollno');
  const [pendingrequest,setpendingRequest] = useState([]);
  const [approvedrequest,setapproevdRequest] = useState([]);
  const [rejectedrequest,setrejectedRequest] = useState([]);
  const [request,setRequest] = useState([]);


const approve = "http://localhost:3001/api/ApprovedDashboardRequest"
const reject = "http://localhost:3001/api/RejectDashboardRequest"
const pending = "http://localhost:3001/api/PendingDashboardRequest"
const allRequest = "http://localhost:3001/api/AllDashboardRequest"



  return (
    <>
   <Header/>
    <div>
    
    <h1> {localStorage.getItem('name')}</h1>
        
   
   <Box flex  height='200px' flexGrow={1} justifyItems='flex-end' p={1} m={3}>
       <Grid container  direction='row' alignItems="center" rowSpacing={4} columnSpacing={16}>
      

<Grid item>
<DashBoardCard color="blue" fontColor="blue" reqName = "All ExamForm Requests" url={allRequest} user={user}/>


</Grid>



<Grid item>
<DashBoardCard color="green" fontColor="green" reqName = "Approved Examforms" url={approve} user={user}/>


</Grid>


<Grid item>
<DashBoardCard color="red" fontColor="red" reqName = "Rejected Examforms" url={reject} user={user}/>


</Grid>


<Grid item>
<DashBoardCard color = "orange" fontColor="orange" reqName = "Awaiting Examforms" url={pending} user={user}/>


</Grid>






   </Grid>
   </Box><br /><br /><br /><br />
   <Divider variant="middle">Fees Paid <FaRupeeSign/> </Divider>
      <FeesRequestTable />
      


    </div>
    </>
  )
}

export default DashBoard
