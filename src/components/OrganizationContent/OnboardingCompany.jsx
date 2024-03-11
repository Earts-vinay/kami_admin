import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { InputLabel, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

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

const OnboardingCompany = () => {
    const onDrop = useCallback((acceptedFiles) => {
        // Handle dropped files here
        console.log('Dropped Files:', acceptedFiles);
      }, []);
      const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box sx={{padding:"20px", height:"76vh"}}>
      <Grid container spacing={3}>
        {/* Company Name and Dropdown */}
        <Grid item xs={7}>
          <Typography variant="body2">Company Name</Typography>
          <TextField label="Company Name" fullWidth size='small' margin="dense"/> 
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body2">Industry</Typography>
          <TextField label="Dropdown" fullWidth size='small' select margin="dense">
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
          </TextField>
        </Grid>

        {/* Logo Upload Section */}
        
        <Grid item xs={12}>
      <Typography variant="body2">Logo</Typography>
      <Box sx={{ background: '#E3EBFC', padding: '20px',display:"flex",justifyContent:"space-evenly",alignItems:"center",borderRadius:"10px" }}>
        <div {...getRootProps()} style={{ cursor: 'pointer', marginTop: '10px',display:"flex",alignItems:"center",gap:"20px" }}>
          <input {...getInputProps()} />
          <img src="assets/icons/uploadicon.svg" alt="" />
         <Box>
         <Typography sx={{color:'#2465e9'}}>Drag Your logo here</Typography>
         <Box display="flex" flexDirection="column">
         <Typography variant='body-2'>Preferred File 512*512</Typography>
          <Typography variant='body-2'>Format Supported .jpg & .png</Typography>
         </Box>
         </Box>
        </div>
     <Box>
     <Button variant="contained" color="primary" onClick={() => document.getElementById('fileInput').click()}>
          Browse Files
        </Button>
     </Box>
        <input type="file" id="fileInput" style={{ display: 'none' }} />
      </Box>
    </Grid>
       
      

        {/* Left Side */}
        <Grid item md={7} xs={12} paddingX="20px"> 
          <Typography variant="body1">Address</Typography>
          <TextField label="Search by Name or Location" fullWidth size='small' margin="dense" />
          {/* Implement Map */}
        <Box marginTop={2}>
        <MapContainer />
        </Box>
   
        </Grid>

        {/* Right Side */}
        <Grid item md={5} xs={12} paddingX="20px" >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2">Address</Typography>
              <TextField label="Address" fullWidth size='small' margin="dense"/>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">City</Typography>
              <TextField label="City" fullWidth size='small' margin="dense"/>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">State</Typography>
              <TextField label="State" fullWidth size='small' margin="dense"/>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Country</Typography>
              <TextField label="Country" fullWidth size='small' margin="dense"/>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Pincode</Typography>
              <TextField label="Pincode" fullWidth size='small' margin="dense"/>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Time Zone</Typography>
              <TextField label="Time Zone" fullWidth select size='small' margin="dense">
                <MenuItem value="timezone1">Time Zone 1</MenuItem>
                <MenuItem value="timezone2">Time Zone 2</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OnboardingCompany;
