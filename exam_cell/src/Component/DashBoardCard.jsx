import React, { useEffect,useState} from 'react'
import axios from 'axios';
import {Paper,Container, Typography} from "@mui/material"
function DashBoardCard(props) {
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
            height:'190px',
            borderTopLeftRadius:'10%',
            borderBottomLeftRadius:'10%',
            borderLeft:`6px solid ${props.color}`,
            color:`${props.fontColor}`
            
          }}>
            <Typography variant='h4' fontStyle="revert" color={props.fontColor} fontFamily="inherit"  >{props.reqName}</Typography>
            <br />
     {data ? <Typography variant='h2' gutterBottom fontWeight='400' component='h2'>{data.myCount}</Typography> :"Loading"}

     {!data && <Typography variant='h2' gutterBottom fontWeight='400' component='h2'>Loading</Typography>}
          </Paper>
        </div>


     </Container>
    </div>
    
  
  )
}

export default DashBoardCard;
