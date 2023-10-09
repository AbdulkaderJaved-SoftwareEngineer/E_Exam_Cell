import Login from './Component/Login';
import './App.css';
import Profile from './Component/Profile';
import ExamForm from './Component/ExamForm';
import Header from './Component/Header';
import SignUp from './Component/SignUp';
import DashBoard from "./Component/DashBoard";
import Logout from "./Component/Logout";
import { Routes,Route, BrowserRouter } from 'react-router-dom';
import ProtectedRouter from './ProtectedRouter';
import AllRequests from './Component/AllRequests';
import ShowProfile from './Component/ShowProfile';
import ErrorPage from './Component/ErrorPage';
import Admin from "./Component/Admin/Admin";
import AdminSignUp from './Component/Admin/AdminSignUp';
import AdminViewRequests from './Component/Admin/AdminViewRequests';
import { ThemeProvider,useTheme,createMuiTheme } from '@mui/material/styles';
import PreviewRequest from "./Component/Admin/PreviewRequest"
import AdminProtectedRoutes from './Component/Admin/AdminProtectedRoutes';
import Announcement from './Component/Announcement';
import AdminDashBoard from './Component/Admin/AdminDashBoard';
import AdminLogout from './Component/Admin/AdminLogout';
import MakeAnnouncement from './Component/Admin/MakeAnnouncement';
import FeesPayment from './Component/FeesPayment';
import FeesReceipt from './Component/FeesReceipt';
function App() {
  
  return (

    <div className="App">
    
    
     <Routes>
      <Route path ="/" element={<ProtectedRouter Component={Login}/>} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Profile" element={<ProtectedRouter Component={Profile}/>} />
      <Route path="/Examform" element={<ProtectedRouter Component={ExamForm}/>}/>
      <Route path="/SignUp" element={<SignUp/>}/>
      <Route path="/DashBoard" element={<ProtectedRouter Component={DashBoard}/>}/>
      <Route path="/Logout" element={<ProtectedRouter Component={Logout}/>}/>
      <Route path="/AllRequests" element={<ProtectedRouter Component={AllRequests}/>}/>
      <Route path="/ShowProfile" element={<ProtectedRouter Component={ShowProfile}/>}/>
      <Route path="/Announcement" element={<ProtectedRouter Component={Announcement}/>}/>
      <Route path="/AdminLogout" element={<AdminProtectedRoutes AdminComponent={AdminLogout}/>}/>
      <Route path="/Admin" element={<AdminProtectedRoutes AdminComponent={Admin}/>}/>
      <Route path="/AdminSignUp" element={<AdminProtectedRoutes AdminComponent={AdminSignUp}/>}/>
      <Route path="/AdminViewRequest" element={<AdminProtectedRoutes AdminComponent={AdminViewRequests}/>}/>
      <Route path="/AdminDashBoard" element={<AdminProtectedRoutes AdminComponent={AdminDashBoard}/>}/>
      <Route path="/MakeAnnouncement" element={<AdminProtectedRoutes AdminComponent={MakeAnnouncement}/>}/>
      <Route path="/FeesPayment" element={<ProtectedRouter Component={FeesPayment}/>}/>
      <Route path="/FeesReceipt/:id" element={<ProtectedRouter Component={FeesReceipt}/>}/>

      <Route path="/PreviewRequest/:formId" Component={PreviewRequest}/>
      <Route path="*" element={ErrorPage}/>
     </Routes>






    </div>
  );
}

export default App;
