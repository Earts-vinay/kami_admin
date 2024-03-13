import React from 'react';
import { Box, Grid, TextField, MenuItem, Typography, InputAdornment } from '@mui/material';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import SearchIcon from '@mui/icons-material/Search';

const MapContainer = () => {
  const mapStyles = {
    height: '400px',
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

const PropertyOnboarding = () => {
  return (
<Box sx={{ padding: "20px" }}>
      <Grid container spacing={2} >
        {/* Left side */}
        <Grid md={6} padding="10px" spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">Property Name / ID</Typography>
            <TextField label="Input Field 1" fullWidth margin="dense" size="small" />
          </Grid>
          <Grid item xs={12} md={12} marginTop={3} >
            <Typography variant="body2">Search</Typography>
            <TextField
              fullWidth
              label="Search"
              fontSize="14px"
              variant="outlined"
              style={{ marginBottom: '20px', border: 'solid 1px #2465e9' }}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ backgroundColor: 'linear-gradient(119deg, #ebeffa 2%, #e8ebfd 30%, #f0ecf9 51%, #efeefb 70%, #eef7ff 100%)', border: 'none', borderRadius: '5px' }}
            />

          </Grid>

          <Box marginTop={2}>
            <MapContainer />
          </Box>
          {/* Map */}
          {/* Implement your map component here */}
        </Grid>


        {/* Right side */}
        <Grid md={6} padding="10px" container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">Property Type</Typography>
            <TextField label="Dropdown" select fullWidth margin="dense" size="small">
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">Address</Typography>
            <TextField label="Text Field 1" fullWidth margin="dense" size="small" />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">City</Typography>
            <TextField label="Text Field 2" fullWidth margin="dense" size="small" />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">state</Typography>
            <TextField label="Text Field 3" fullWidth margin="dense" size="small" />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">Country</Typography>
            <TextField label="Text Field 4" fullWidth margin="dense" size="small" />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">Pincode</Typography>
            <TextField label="Text Field 5" fullWidth margin="dense" size="small" />
          </Grid>
          {/* <Grid item xs={12} md={12}>
            <Typography variant="body2">Address</Typography>
            <TextField label="Text Field 6" fullWidth margin="dense" size="small" />
          </Grid> */}
          <Grid item xs={12} md={12}>
            <Typography variant="body2">Time Zone</Typography>
            <TextField label="Dropdown 2" select fullWidth margin="dense" size="small">
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PropertyOnboarding;
