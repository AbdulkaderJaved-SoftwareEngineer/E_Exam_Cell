import {React,useEffect,useState} from 'react';
import { Typography } from '@mui/material';
import Header from './Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import  { tableCellClasses } from '@mui/material/TableCell';
import Axios from 'axios';
import {FcApproval,FcClock} from "react-icons/fc"
import {GoXCircle} from "react-icons/go"
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";








const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));








//------------------------------------------------------------------>
function AllRequests()
{

const [request,setRequest] = useState([])
const [modalData , setModalData] = useState([])

const user = localStorage.getItem('rollno')
console.log(user)
useEffect(
()=>
{

Axios.post("http://localhost:3001/api/getRequest",{user:user})
.then((response)=>{
console.log(response)
setRequest(response.data)
console.log(request)
})


},[])


function handleModal(option)
{
  Axios.post("http://localhost:3001/api/ExamFormById",{ExamFormId:option})
  .then((res)=>{
    setModalData(res.data[0]);
    console.log(res)
  })
console.log(option)
(<Modal
open={true}>
{modalData.map((item)=>(
  <Typography>{item.ExamFormId}</Typography>
))}
</Modal>)

}







return(
  <>
 <Header/>
    <div className="table">
    <TableContainer component={Paper} style={{marginTop:'6%',width:'800px',marginLeft:'20%'}}>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <StyledTableCell><Typography >Exam Form No.</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography>Date of Submission</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography >Status</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography >Comments</Typography></StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        
              {
                request.map((request)=>(
                <>
                <StyledTableRow >
              <StyledTableCell align="center">
              <Link 
              
              component="button" 
              variant ="body2"
              onClick={()=>{handleModal(request.ExamFormId)}}
              > 
              {request.ExamFormId}</Link>
              
              </StyledTableCell>
              <StyledTableCell align="center">12-2-2022</StyledTableCell>
              {
                    request.ExamFormStatus === "APPROVED"?
                    <>
                    <br/>
                    {request.ExamFormStatus}
                    
                    &nbsp;&nbsp;
                    <FcApproval />
                    </>
                    
                    :
                    request.ExamFormStatus === "REJECTED" ?
                    <>
                    <br/>
                    {request.ExamFormStatus}
                    &nbsp;&nbsp;
                    <GoXCircle style={{color:"red"}}/>
                    </>
                    
                    :

                    <>
                    <br/>
                    
                    
                    {request.ExamFormStatus}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <FcClock style={{color:"red"}}/>
                    
                    
                    </>


              }
              <StyledTableCell align="center"><>{request.Comments}</></StyledTableCell>
              </StyledTableRow>
                </>


                ))
              }
              
              
          






        </TableBody>
      </Table>
        </TableContainer>
    </div>
  
  </>
)


}



export default AllRequests;