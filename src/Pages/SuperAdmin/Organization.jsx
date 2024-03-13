
import React,{useState} from 'react'
import SideNav from '../../components/SideNav'
import { Box, Grid, Button, InputAdornment } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../redux/sidenav/sidenavSlice';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import "./style.css";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { padding } from '@mui/system';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const mapContainerStyle = {
  width: '700px',
  height: '500px',
};

const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};

const Organization = () => {

  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleSideNav());
  };



  return (
    <div  style={{ display: 'flex' }}> 
       <SideNav open={isOpen} handleToggle={handleToggle} />
      <div style={{ marginLeft: isOpen ? '250px' : '70px', padding: '10px', width: '100%', transition: 'margin 0.3s ease' }}>
      <Box sx={{ backgroundColor: "white", borderRadius: "10px", padding: "10px", margin: "10px" }}>
        organization
      </Box>
        </div>

    </div>
    
  )
}

export default Organization
