import {React,useEffect,useState} from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import  { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import {Link} from "react-router-dom";
import { Typography } from "@mui/material";
import { FaRupeeSign } from "react-icons/fa";






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
  
  
  
  



function FeesRequestTable()
{
const [data,setData] = useState([]);
const id = localStorage.getItem('rollno');
useEffect(()=>
{
axios.get(`http://localhost:3001/api/FeesPayment/${id}`).then((response)=>{
if(response.status === 200)
{
    setData(response.data)
}
})
})


    return(
<div className="table">
    <TableContainer component={Paper} style={{marginTop:'4%',width:'1100px',marginLeft:'13%'}}>
      <Table sx={{ minWidth: 500 }}  aria-label="simple table">
        <TableHead>
          <TableRow>
          <StyledTableCell><Typography >Reciept No.</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography>RollNo</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography >Name</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography >Paid On</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography >Amount {<FaRupeeSign />}</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography >Balance  {<FaRupeeSign />}</Typography></StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        
       {!data ? "No results Found":""}
              {
               data.length < 1 ? "Loading": data.map((data)=>(
                <>
                <StyledTableRow >
              <StyledTableCell align="center">
              <Link 
              to={`/FeesReceipt/${data.r_no}`}
              component="button" 
              variant ="body2"
              
              > 
              {data.r_no}</Link>
              
              </StyledTableCell>
              <StyledTableCell align="center">{data.rollno}</StyledTableCell>
              
              <StyledTableCell align="center">{data.paidOn}</StyledTableCell>
              
              <StyledTableCell align="center">{data.name}</StyledTableCell>
              
              <StyledTableCell align="center"><>{data.amount}</></StyledTableCell>

              <StyledTableCell align="center"><>{137400 - (data.amount)}</></StyledTableCell>
              </StyledTableRow>
                </>


                ))
              }
              
              
          






        </TableBody>
      </Table>
        </TableContainer>
    </div>
    )
}

export default FeesRequestTable;