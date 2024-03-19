import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Grid, Typography, TextField, Box } from '@mui/material'; // Importing Material-UI components
import CustomTextField from '../../../../../CommonComponent/CustomTextField';

const commonStyles = {
  fontFamily: "montserrat-regular",
};
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
        <CustomTextField label="Device Name"/>
        </Box>
        
        <Box sx={{ marginBottom: '20px' }}>
        <CustomTextField label="Pole Id"/>
        </Box>

        <Box sx={{ marginBottom: '20px' }}>
        <CustomTextField label="Latitude"/>
        </Box>

        <Box sx={{ marginBottom: '20px' }}>
        <CustomTextField label="Longitude"/>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <MapContainer />
      </Grid>
    </Grid>
  );
};

export default DeviceSetup;
