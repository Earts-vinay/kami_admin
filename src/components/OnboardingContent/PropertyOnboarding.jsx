import React, { useState } from 'react';
import { Box, Grid, TextField, MenuItem, Typography, InputAdornment } from '@mui/material';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import SearchIcon from '@mui/icons-material/Search';

const commonStyles = {
  fontFamily: "montserrat-regular",
};

const MapContainer = () => {
  const mapStyles = {
    height: '50vh',
    width: '100%',
    borderRadius:"10px"
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


const PropertyOnboarding = ({ dropdownData }) => {
  const [propertyType, setPropertyType] = useState("");

  // console.log(dropdownData);
  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2} display="flex" gap={2} >
        {/* Left side */}
        <Grid md={6} sm={12} xs={12} padding="10px" spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="body2" sx={commonStyles} >Property Name / ID</Typography>
            <TextField label="Property Name / ID" fullWidth margin="dense" size="small" sx={commonStyles} />
          </Grid>
          <Grid item xs={12} md={12} marginTop={3} >
            <Typography variant="body2" sx={commonStyles}>Search</Typography>
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
        <Grid item xs={12} md={11}>
          <Typography variant="body2" sx={commonStyles}>Property Type</Typography>
          <TextField
            label="Property Type"
            select
            fullWidth
            margin="dense"
            size="small"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            {dropdownData && dropdownData.data && dropdownData.data.property_types && dropdownData.data.property_types.map((propertyType) => (
              <MenuItem key={propertyType.id} value={propertyType.id}>
                {propertyType.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
          <Grid item xs={12} md={11}>
            <Typography variant="body2" sx={commonStyles}>Address</Typography>
            <TextField label="Address" fullWidth margin="dense" size="small" />
          </Grid>
          <Grid item xs={12} md={11}>
            <Typography variant="body2" sx={commonStyles}>City</Typography>
            <TextField label="City" fullWidth margin="dense" size="small" />
          </Grid>
          <Grid item xs={12} md={11}>
            <Typography variant="body2" sx={commonStyles}>state</Typography>
            <TextField label="State" fullWidth margin="dense" size="small" />
          </Grid>
          <Grid item xs={12} md={11}>
            <Typography variant="body2" sx={commonStyles}>Country</Typography>
            <TextField label="Country" fullWidth margin="dense" size="small" />
          </Grid>
          <Grid item xs={12} md={11}>
            <Typography variant="body2" sx={commonStyles}>Pincode</Typography>
            <TextField label="Pincode" fullWidth margin="dense" size="small" />
          </Grid>
          {/* <Grid item xs={12} md={12}>
            <Typography variant="body2" sx={commonStyles}>Address</Typography>
            <TextField label="Text Field 6" fullWidth margin="dense" size="small" />
          </Grid> */}
          <Grid item xs={12} md={11}>
            <Typography variant="body2" sx={commonStyles}>Time Zone</Typography>
            <TextField label="Time Zone" select fullWidth margin="dense" size="small">
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
