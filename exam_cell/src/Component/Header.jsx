import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArticleIcon from '@mui/icons-material/Article';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { deepOrange, deepPurple } from '@mui/material/colors';
import MyAvatar from '../images/Abdulkader_19818.jpg';
import Stack from '@mui/material/Stack';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SignUp from './SignUp'
import Axios from "axios";
import axios from "axios";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import { styled, useTheme } from '@mui/material/styles';
import {FaUserAlt, FaUserEdit} from 'react-icons/fa'
import {LuLogOut} from "react-icons/lu"

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);




















function Header(){
const [profilePic,setProfilePic] = useState()
const userid = localStorage.getItem('rollno');
console.log(userid)
useEffect(
  ()=>{
   
    Axios.post("http://localhost:3001/api/getProfileImage",{user:userid}).then((response)=>{
      if(response.status === 200)
{
  console.log(response)
  if(response.data.length  > 0)
    
  {
    if(!response.data[0].Profile)
    {
      setProfilePic(localStorage.getItem('name'))
    }
    
    setProfilePic(response.data[0].Profile)
    console.log("This is a Length",response.data.length)
  }
  else{
    setProfilePic(localStorage.getItem('name'))
  }
}  
if(response.status === 404)
{
  console.log("Logged Out")
}  

})
 
},[profilePic])








const theme = useTheme();
const [open, setOpen] = React.useState(false);

const handleDrawerOpen = () => {
  setOpen(true);
};

const handleDrawerClose = () => {
  setOpen(false);
};


  const navigate = useNavigate()
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
const handleMenuClick = (pageUrl)=>{

  navigate(pageUrl)
}
return(
  <>    
  {
    localStorage.getItem('auth')
    ?
    (
    <>
    <Box>
 <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography  component="h2" >E-ExamCell</Typography>


          <Typography variant="h6" noWrap component="div" style={{flexGrow:1}}>
            
          </Typography>
          {
            localStorage.getItem('auth')? (
              <div>
               
                  
                  <Stack direction="row" spacing={2}>
                  <Typography variant="h6" color="light">{localStorage.getItem('name')}</Typography>
        <Avatar src={`http://localhost:3001/images/${profilePic}`}
        alt={localStorage.getItem('name')}  onClick={handleMenu} />
       
      </Stack>
               
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  
                
                  
  
                    <MenuItem onClick={()=>{handleMenuClick('/Profile')}}>
                    <FaUserEdit/>&nbsp; {"Edit Profile"}</MenuItem>
                    
                    <MenuItem onClick={()=>{handleMenuClick('/ShowProfile')}}>
                    <FaUserAlt/>&nbsp;{"Show Profile"}</MenuItem>

                    
                    <Divider/>
                    <MenuItem onClick={()=>{handleMenuClick('/Logout')}}>
                    <LuLogOut style={{color:'red'}}/> &nbsp;<Typography variant="body1" color='red'>Logout</Typography></MenuItem>
                </Menu>
              </div>
            )
          
          :
          (
            <Button LinkComponent={SignUp}>SignUp</Button>
          )
          
          
          
          }
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}  style={{
          background:'blue'

      }}>
        <DrawerHeader>
        <Avatar src={`http://localhost:3001/images/${profilePic}`}
        alt={localStorage.getItem('name')}/>
        &nbsp;&nbsp;&nbsp;
        {localStorage.getItem('name')}
     
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon />  : <><ChevronLeftIcon/></> }
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {
          
          localStorage.getItem('auth')?(
<>              <Tooltip title="All Requests" arrow placement="right">
                  <ListItem key={0} disablePadding sx={{ display: 'block' }}>

                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                  onClick={()=>{handleMenuClick('/AllRequests')}}
                  
                    >
                    <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:"black"
                  }}
                  onClick={()=>{handleMenuClick('/AllRequests')}}
                >
                    <ArticleIcon />
                    
                    
                </ListItemIcon>
                <ListItemText primary="All Requests" sx={{ opacity: open ? 1 : 0 }} 
                
                
                
                />




              </ListItemButton>
              </ListItem>
              </Tooltip>
                  <Divider/>
                  <Tooltip title="ExamForm" arrow placement="right">
              <ListItem key={1} disablePadding sx={{ display: 'block' }}>

<ListItemButton
  sx={{
    minHeight: 50,
    justifyContent: open ? 'initial' : 'center',
    px: 2.5,
  }}
  onClick={()=>{handleMenuClick('/ExamForm')}}
>
<ListItemIcon
sx={{
minWidth: 0,
mr: open ? 3 : 'auto',
justifyContent: 'center',
color:"black"
}}
onClick={()=>{handleMenuClick('/ExamForm')}}
>
<QuestionAnswerRoundedIcon />

</ListItemIcon>

<ListItemText primary="ExamForm" sx={{ opacity: open ? 1 : 0 }} />



</ListItemButton>
</ListItem>
</Tooltip>
<Divider/>

<Tooltip title="Announcements" arrow placement="right">
<ListItem key={2} disablePadding sx={{ display: 'block' }}>

<ListItemButton
  sx={{
    minHeight: 48,
    justifyContent: open ? 'initial' : 'center',
    px: 2.5,
  }}
  onClick={()=>{handleMenuClick('/Announcement')}}

>
<ListItemIcon
sx={{
minWidth: 0,
mr: open ? 3 : 'auto',
justifyContent: 'center',
color:"black"
}}
>
<LeaderboardRoundedIcon />

</ListItemIcon>
<ListItemText primary="Announcements" sx={{ opacity: open ? 1 : 0 }} />



</ListItemButton>
</ListItem>
</Tooltip>
<Divider/>
<Tooltip title="DashBoard" arrow placement="right">
<ListItem key={4} disablePadding sx={{ display: 'block' }}>

<ListItemButton
  sx={{
    minHeight: 48,
    justifyContent: open ? 'initial' : 'center',
    px: 2.5,
  }}
  onClick={()=>{handleMenuClick('/DashBoard')}}

>
<ListItemIcon
sx={{
minWidth: 0,
mr: open ? 3 : 'auto',
justifyContent: 'center',
color:"black"
}}
onClick={()=>{handleMenuClick('/DashBoard')}}
>
<DashboardRoundedIcon />

</ListItemIcon>
<ListItemText primary="DashBoard" sx={{ opacity: open ? 1 : 0 }} 



/>



</ListItemButton>
</ListItem>
</Tooltip>






         </>
             
            )



          
          :
          <></>
          
          
          
          
          
          
          
          
          
          
          
          }
        </List>
        <Divider />
        <List>
          {}
        </List>
      </Drawer>
      </Box>
      {}
   


</Box>
    
    
    </>
    )
    :
    <>
    
    <AppBar position="static">
        <Toolbar> 
         
            
           <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            eExam Cell
          </Typography>
          {localStorage.getItem('auth')? (
            <div>
             
                
                <Stack direction="row" spacing={2}>
                <Typography variant="h6" color="light">{localStorage.getItem('name')}</Typography>
      <Avatar sx={{ bgcolor: deepPurple[500]}}
      alt={localStorage.getItem('name')}  onClick={handleMenu} />
     
    </Stack>
             
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={()=>{handleMenuClick('/DashBoard')}}>DashBoard</MenuItem>
              
                <MenuItem onClick={()=>{handleMenuClick('/ExamForm')}}>
                  ExamForm</MenuItem>

                  <MenuItem onClick={()=>{handleMenuClick('/Profile')}}>
                  Profile</MenuItem>

                  <MenuItem onClick={()=>{handleMenuClick('/Logout')}}>
                  Logout</MenuItem>
              </Menu>
            </div>
          )
        
        :
        (
          <Button LinkComponent={SignUp}>SignUp</Button>
        )
        
        
        }
        </Toolbar>
      </AppBar>
    
    
    
    
    
    </>
  }
  <div>
 


































   
       
 </div>





    </>
)

}
export default Header;