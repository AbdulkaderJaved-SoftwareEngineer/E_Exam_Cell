import {React} from 'react'
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { useEffect } from 'react';
function AdminLogout() {
const navigate = useNavigate()
useEffect(()=>{
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('name');
    navigate('/Admin');
})   
  return (
    <div>
      <Alert severity='success'>
        Logging out Admin

      </Alert>
    </div>
  )
}

export default AdminLogout
