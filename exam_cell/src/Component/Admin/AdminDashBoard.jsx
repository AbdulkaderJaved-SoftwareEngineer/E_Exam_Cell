import React from 'react'
import AdminHeader from './AdminHeader';
import Box from "@mui/material/Box";
import DashBoardCard from '../DashBoardCard';
import  Grid  from '@mui/material/Grid';
import AdminDashBoardCard from './AdminDashBoardCard';
function AdminDashBoard() {

  const approve = "http://localhost:3001/admin/ApprovedDashboardRequest"
  const reject = "http://localhost:3001/admin/RejectedDashBoardRequest"
  const pending = "http://localhost:3001/admin/AwaitingDashBoardRequest"
  const allRequest = "http://localhost:3001/admin/AllDashboardRequest"
const username = localStorage.getItem('name');
  return (
    <div>
      <AdminHeader />
      <Box   marginTop="6%" sx={{
        width: '1000px',
        height: '600px',
        marginLeft: '20%'
      }}>
        <h1>DashBoard</h1>
      

        <Box flex height='200px' flexGrow={1} justifyItems='flex-end' p={1} m={3}>
          <Grid container direction='row' alignItems="center" rowSpacing={4} columnSpacing={16}>


            <Grid item>
              <AdminDashBoardCard color="blue" fontColor="blue" reqName="All Requests" url={allRequest} user={username} />


            </Grid>



            <Grid item>
              <AdminDashBoardCard color="green" fontColor="green" reqName="Approved" url={approve}  user={username}/>


            </Grid>


            <Grid item>
              <AdminDashBoardCard color="red" fontColor="red" reqName="Rejected" url={reject} user={username}/>


            </Grid>


            <Grid item>
            <br /><br /><br />
              <AdminDashBoardCard color="orange" fontColor="orange" reqName="Awaiting" url={pending} user={username}/>


            </Grid>






          </Grid>
        </Box>

      </Box>
    </div>
  )
}

export default AdminDashBoard;
