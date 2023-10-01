import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import {Paper,Container, Typography} from "@mui/material";
function AdminDashBoardCard(props) {
    const [data,setData] = useState([]);
    useEffect(
        ()=>{
        
       axios.post(props.url,{user:props.user}).then((res)=>{
        if(res.status === 200)
        {
      
          setData(res.data[0])
          console.log(res.data[0])
        }
       })
        }
        ,[])
  return (
    <div>
  <Container
     style={{
      width:'200px',
      height:'100px',
      marginLeft:'4%'
    }}>
     <div>
          <Paper elevation={8} 
          style={{
            width:'300px',
            height:'140px',
            borderTopLeftRadius:'5%',
            
            borderLeft:`3px solid ${props.color}`,
            color:`${props.fontColor}`
            
          }}>
            <Typography variant='h4' fontStyle="revert" color={props.fontColor} fontFamily="inherit"  >{props.reqName}</Typography>
            <br />
     {data ? <Typography variant='h2' gutterBottom fontWeight='400' component='h2'>{data ? data.myCount : "0"}</Typography> :"Loading"}

          </Paper>
        </div>


     </Container>
    </div>
  )
}

export default AdminDashBoardCard;
