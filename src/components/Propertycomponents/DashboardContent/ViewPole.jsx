


import React, { useState } from 'react'
import { Box, Grid, Button, Typography, TextField} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../SideNav';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../../redux/sidenav/sidenavSlice';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {
  const mapStyles = {
    height: '350px',
    width: '100%',
  };

  const defaultCenter = {
    lat: 37.7749, // Default latitude
    lng: -122.4194, // Default longitude
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCRQBtQkOyqMNr0YheCgm9LVbvjRtnbo6Y">
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
        {/* You can customize the map as needed */}
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

const ViewPole = () =>{
    const navigate = useNavigate();
    const isOpen = useSelector(selectIsSideNavOpen);
    const dispatch = useDispatch();
  
    const handleToggle = () => {
      dispatch(toggleSideNav());
    };
  
    const handleviewpole = () => {
      navigate(`/addpole`);
    };
    
    const data = [
         { pole: 23643, latlong: 17.4948788988, cameras: 3, activeCameras: 3 },
        { pole: 23643, latlong: 17.4948788988, cameras: 3, activeCameras: 3},
        { pole:23643, latlong: 17.4948788988, cameras: 3, activeCameras: 3 },
        { pole: 23643,latlong: 17.4948788988, cameras: 3, activeCameras: 3},
        ];
      


  const mapContainerStyle = {
    width: '700px',
    height: '500px',
  };
  
  const center = {
    lat: 7.2905715, // default latitude
    lng: 80.6337262, // default longitude
  };
  

    return(
        <div style={{ display: 'flex' }}>
        <SideNav open={isOpen} handleToggle={handleToggle} />
        <div style={{
          marginLeft: isOpen ? '220px' : '90px',
          padding: '10px', width: '100%', transition: 'margin 0.3s ease'
        }}>

<Box style={{ height: '90vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginLeft: '10px', marginRight: '10px' }}>
          
<Box textAlign="left" display="flex" alignItems="center" cursor="pointer" py={2} onClick={() => handleviewpole()}>
          
            <ChevronLeftIcon />
            <Typography variant="body-2" style={{ marginRight: '10px' }}>
                      WallMart Supermarket
                    </Typography>
          </Box>

          <Box sx={{display:'flex', gap:"10px"}}>
<Box sx={{width:"50%",padding:"20px"}}>

<Typography variant="body2">Pole ID</Typography>
            <TextField label="Pole Id" fullWidth margin="dense" size="small" />

            <Typography variant="body2" py={2}>Mark on Map</Typography>

            <Typography variant="body2">Lat</Typography>
            <TextField label="Pole Id" fullWidth margin="dense" size="small" />
            <Typography variant="body2">Long</Typography>
            <TextField label="Pole Id" fullWidth  margin="dense" size="small" />

</Box>
        
                
           {/* Map */}
           <Box width="50%">
        <MapContainer />
        </Box>
        </Box>

        <Box sx={{ marginTop: '40px', textAlign: 'center' }}>
      <Button variant="outlined" onClick={() => handleviewpole()}  style={{ marginRight: '10px' }}>Back</Button>
        <Button variant="contained" color="primary" >Save</Button>
       
      </Box>
          </Box>
        
        </div>
      </div>
  
    )
}
export default ViewPole;