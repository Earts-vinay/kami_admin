
import React,{useState} from 'react'
import SideNav from '../components/SideNav'
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../redux/sidenav/sidenavSlice';

const Organization = () => {

  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleSideNav());
  };

  return (
    <div  style={{ display: 'flex' }}> 
       <SideNav open={isOpen} handleToggle={handleToggle} />
      <div style={{ marginLeft: isOpen ? '210px' : '90px', padding: '10px', width: '100%', transition: 'margin 0.3s ease' }}>
      <Box sx={{ backgroundColor: "white", borderRadius: "10px", padding: "10px", margin: "10px" }}>
        organization
      </Box>
        </div>

    </div>
  )
}

export default Organization
