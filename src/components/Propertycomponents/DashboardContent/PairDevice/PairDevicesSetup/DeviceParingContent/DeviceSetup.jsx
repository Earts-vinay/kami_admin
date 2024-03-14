import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Box, Typography, TextField } from '@mui/material'; // Importing Material-UI components

const DeviceSetup = () => {
  const MapContainer = () => {
    const mapStyles = {
      height: '550px',
      width: '100%',
    };

    const defaultCenter = {
      lat: 37.7749, // Default latitude
      lng: -122.4194, // Default longitude
    };

    return (
      <LoadScript googleMapsApiKey="AIzaSyCRQBtQkOyqMNr0YheCgm9LVbvjRtnbo6Y"> {/* Replace YOUR_API_KEY_HERE with your actual Google Maps API key */}
        <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
          {/* You can customize the map as needed */}
          <Marker position={defaultCenter} />
        </GoogleMap>
      </LoadScript>
    );
  };

  return (
    <>
     

        <Box sx={{ display: 'flex', gap: "10px",paddingY:"25px" }}>
          <Box sx={{ width: "50%", padding: "20px" }}>

            <Typography variant="body2">Device Name</Typography>
            <TextField label="Device Name" fullWidth margin="dense" size="small" />
            <Typography variant="body2">Pole </Typography>
            <TextField label="Pole Id" fullWidth margin="dense" size="small" />
            

            <Typography variant="body2">Lat</Typography>
            <TextField label="Lat" fullWidth margin="dense" size="small" /> {/* Corrected TextField label */}
            <Typography variant="body2">Long</Typography>
            <TextField label="Long" fullWidth margin="dense" size="small" /> {/* Corrected TextField label */}

          </Box>

          {/* Map */}
          <Box width="50%">
            <MapContainer />
          </Box>
        </Box>
   
    </>
  )
}

export default DeviceSetup;
