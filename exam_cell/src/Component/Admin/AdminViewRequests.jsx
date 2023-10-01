import  Axios from "axios";
import React, { useState } from 'react'
import { useEffect } from 'react'
import Header from '../Header'
import AdminRequestCard from "./AdminRequestCard";
import { Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AdminHeader from "./AdminHeader";
function AdminViewRequests() {
const [request,setRequest] = useState([])


function getAllRequest()
{
  Axios.get("http://localhost:3001/admin/getAllUserRequest")
.then(
(response)=>
{
console.log(response)
if(response.status ===200)
{setRequest(response.data)
}
})

}
  useEffect(
  
  ()=>
  
  {
getAllRequest()

  },[])




  return (
    <div style={{width:'100%',height:'auto',background:'#D8D8D8'}}>
    <AdminHeader/>

    <Typography variant="h3">All Requests </Typography>

    
    <br/><br/><br/>

<Container>
    
    <Grid container rowSpacing={1}  marginLeft="10%">
    
    {
    
     request.map((item)=>(

      
        <Grid item >
         
        <AdminRequestCard key={item.ExamformId} number={item.ExamFormId} status={item.ExamFormStatus} fullname={item.Fullname} rollno = {item.RollNo} photo={item.profile}
         
        
        
        
        />

        </Grid>
       
       



    
      ))
    
    }

   
    </Grid>   
   
    </Container>   
  </div>
  )
}

export default AdminViewRequests
