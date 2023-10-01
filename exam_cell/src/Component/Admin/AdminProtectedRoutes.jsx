import {React,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function AdminProtectedRoutes(props) {
    const {AdminComponent} = props;
    const navigate = useNavigate()
    useEffect(()=>{
      let login = localStorage.getItem('adminAuth');
      if(!login)
      {
        navigate("/Admin");
      }
      
    });
      return (
        <div>
       <AdminComponent />
        </div>
      )
}

export default AdminProtectedRoutes;
