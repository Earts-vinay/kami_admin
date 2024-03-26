import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Grid, Typography, Box, Button } from '@mui/material';
import CustomTextField from '../../../../../CommonComponent/CustomTextField';
import { toast } from 'react-toastify';
import axios from 'axios';
import { selectToken } from '../../../../../../redux/apiResponse/loginApiSlice';
import { useSelector } from 'react-redux';

const commonStyles = {
  fontFamily: "montserrat-regular",
};

const DeviceSetup = (props) => {
  const { deviceId } = props;
  const [poleId, setPoleId] = useState('');
  const [cameraId, setCameraId] = useState(deviceId); // Initialize cameraId with deviceId
  const token = useSelector(selectToken);

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
      <LoadScript googleMapsApiKey="YOUR_API_KEY">
        <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
          <Marker position={defaultCenter} />
        </GoogleMap>
      </LoadScript>
    );
  };

  const pairDevices = async () => {
    try {
      const params = new URLSearchParams();
      params.append('pole_id', poleId);
      params.append('camera_id', cameraId);

      const response = await axios.post(
        'http://35.239.192.201:9092/api/device/pair',
        params,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      toast.success(response.data.msg);
    } catch (error) {
      toast.error('An error occurred while pairing devices.');
    }
  };

  return (
    <Grid container spacing={5} sx={{ padding: '20px' }}>
      <Grid item xs={12} sm={12} md={6} >
        <Box sx={{ marginBottom: '20px' }}>
          <CustomTextField label="Device Name" />
        </Box>

        <Box sx={{ marginBottom: '20px' }}>
          <CustomTextField
            label="Pole Id"
            value={poleId}
            onChange={(e) => setPoleId(e.target.value)}
          />
        </Box>

        <Box sx={{ marginBottom: '20px' }}>
          <CustomTextField
            label="Camera Id"
            value={cameraId}
          // onChange={(e) => setCameraId(e.target.value)}
          />
        </Box>

        <Box sx={{ marginBottom: '20px' }}>
          <CustomTextField label="Latitude" />
        </Box>

        <Box sx={{ marginBottom: '20px' }}>
          <CustomTextField label="Longitude" />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <MapContainer />
      </Grid>
      <Button variant="contained" color="primary" onClick={pairDevices} sx={{ mr: 1, mt: 3 }}>
        Save
      </Button> 
    </Grid>
  );
};

export default DeviceSetup;
