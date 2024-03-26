import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import { Grid, Typography, Box, Button } from '@mui/material';
import CustomTextField from '../../../../../CommonComponent/CustomTextField';
import { toast } from 'react-toastify';
import axios from 'axios';
import { selectToken } from '../../../../../../redux/apiResponse/loginApiSlice';
import { useSelector } from 'react-redux';

const commonStyles = {
  fontFamily: "montserrat-regular",
};
const BaseUrl = process.env.REACT_APP_API_URL

const DeviceSetup = (props) => {
  const { deviceId } = props;
  const [poleId, setPoleId] = useState('');
  const [cameraId, setCameraId] = useState(deviceId); // Initialize cameraId with deviceId
  const token = useSelector(selectToken);

  const MapContainer = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
      setIsLoaded(true);
    }, []);
    const mapStyles = {
      height: '60vh',
      width: '100%',
      borderRadius: '10px', 
    };

    const defaultCenter = {
      lat: 17.4489, // Default latitude
      lng: 78.3907, // Default longitude
    };
    const mapOptions = {
      mapTypeControl: false,
    }
    
  const locations = [
    { lat: 17.4489, lng: 78.3907 }, // Hitech City
    { lat: 17.3616, lng: 78.4747 }, // Charminar
    { lat: 17.4432, lng: 78.3497 }, // Gachibowli
    { lat: 17.4156, lng: 78.4347 }, // Banjara Hills
    { lat: 17.4399, lng: 78.4983 }, // Secunderabad (Default Center)
  ];
    return (
      <div style={{ display: isLoaded ? 'block' : 'none' }}>
      {isLoaded && (
        <LoadScript googleMapsApiKey=" AIzaSyAmaZMMaAgoUxEmbWdg1Xv0d2dSibZcZs8">
          <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter} options={mapOptions}>
            {/* Render markers for each location */}
            {locations.map((location, index) => (
              <MarkerF key={index} position={location} />
            ))}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
    );
  };

  const pairDevices = async () => {
    try {
      const params = new URLSearchParams();
      params.append('pole_id', poleId);
      params.append('camera_id', cameraId);

      const response = await axios.post(
        `${BaseUrl}device/pair`,
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
