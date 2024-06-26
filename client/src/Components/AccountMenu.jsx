import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const token = Cookies.get('token')
  let [user,setUser] = React.useState({})
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URI}/profile/${token}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchData();
  }, []);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let handleLogout=()=>{
    Cookies.remove('token', { path: '' })
    window.location.href = "/"
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {/* <Avatar sx={{ width: 32, height: 32 }}>A</Avatar> */}
            <AccountCircleIcon sx={{color:"white",width: 32, height: 32}}/> 
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
          <Link to={`/profile/${Cookies.get("token")}`}>
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
          </Link>
        {user.role=='admin' &&(       
            <Link to={`/admin/users`}>
            <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />  
          </ListItemIcon>
          Admin
        </MenuItem>
            </Link>
        ) }
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <p onClick={handleLogout}>
          Logout
          </p>
        </MenuItem>
          <Link to={"/add-colors"} style={{color:"black"}}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
          <AddCircleOutlineIcon fontSize="small"/> 
          </ListItemIcon>
          {/* <p onClick={handleLogout}> */}
          Add Colors
          {/* </p> */}
        </MenuItem>
          </Link>
      </Menu>
    </React.Fragment>
  );
}
