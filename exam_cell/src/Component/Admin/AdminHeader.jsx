import { AppBar } from '@mui/material';
import * as React from 'react';
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

import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ArticleIcon from '@mui/icons-material/Article';
import {FaUserAlt, FaUserEdit} from 'react-icons/fa'
import {LuLogOut} from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function AdminHeader() {
  const navigate = useNavigate();
  const handleMenuClick = (pageUrl)=>{

    navigate(pageUrl)
  }
return (

<>
<Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            E Exam Cell Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          color:'dimgray'
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
           
              <ListItem  disablePadding>
                <ListItemButton onClick={()=>{handleMenuClick('/AdminViewRequest')}}>
                  <ListItemIcon>
                  <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText  primary="View All Request"/>
                </ListItemButton>
              </ListItem>
         

              <ListItem  disablePadding>
                <ListItemButton onClick={()=>{handleMenuClick('/AdminDashBoard')}}>
                  <ListItemIcon>
                  <DashboardRoundedIcon />
                  </ListItemIcon>
                  <ListItemText  primary="My DashBoard"/>
                </ListItemButton>
              </ListItem>

              <ListItem  disablePadding>
                <ListItemButton onClick={()=>{handleMenuClick('/MakeAnnouncement')}}>
                  <ListItemIcon>
                  <LuLogOut />
                  </ListItemIcon>
                  <ListItemText  primary="Make Announcements"/>
                </ListItemButton>
              </ListItem>

              <ListItem  disablePadding>
                <ListItemButton onClick={()=>{handleMenuClick('/AdminLogout')}}>
                  <ListItemIcon>
                  <LuLogOut />
                  </ListItemIcon>
                  <ListItemText  primary="Logout"/>
                </ListItemButton>
              </ListItem>


              
          </List>
          <Divider />
          
          
        </Box>
      </Drawer>
      
   </Box>   
</>


)
} 

