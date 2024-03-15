import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Grid, Typography, TextField, Box } from '@mui/material'; // Importing Material-UI components

const DeviceSetup = () => {
  const MapContainer = () => {
    const mapStyles = {
      height: '60vh',
      width: '100%',
      borderRadius: '10px', // Added borderRadius to map container
    };

    const defaultCenter = {
      lat: 37.7749, // Default latitude
      lng: -122.4194, // Default longitude
    };

    return (
      <LoadScript googleMapsApiKey="AIzaSyCRQBtQkOyqMNr0YheCgm9LVbvjRtnbo6Y"> 
        <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
          <Marker position={defaultCenter} />
        </GoogleMap>
      </LoadScript>
    );
  };

  return (
    <Grid container spacing={5} sx={{ padding: '20px' }}>
      <Grid item xs={12} sm={12} md={6} >
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="body2">Device / Camera Name</Typography>
          <TextField label="Device Name" fullWidth margin="dense" size="small" />
        </Box>
        
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="body2">Pole ID</Typography>
          <TextField label="Pole ID" fullWidth margin="dense" size="small" />
        </Box>

        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="body2">Lat</Typography>
          <TextField label="Lat" fullWidth margin="dense" size="small" />
        </Box>

        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="body2">Long</Typography>
          <TextField label="Long" fullWidth margin="dense" size="small" />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <MapContainer />
      </Grid>
    </Grid>
  );
};

export default DeviceSetup;
