
import React from 'react';
import { Box, Grid, TextField, MenuItem, Typography, InputAdornment, Button } from '@mui/material';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import SearchIcon from '@mui/icons-material/Search';
import SideNav from '../../SideNav';
import { selectIsSideNavOpen, toggleSideNav } from '../../../redux/sidenav/sidenavSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import InputField from '../../CommonComponent/InputField';
import CustomButton from '../../CommonComponent/CustomButton';


const MapContainer = () => {
  const mapStyles = {
    height: '400px',
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

const AddProperty = () => {
    const navigate = useNavigate();

    const handleTableRowClick = () => {
        navigate(`/dashboard`);
      };
    const isOpen = useSelector(selectIsSideNavOpen);
    const dispatch = useDispatch();
  
    const handleToggle = () => {
      dispatch(toggleSideNav());
    };


  return (
    <div style={{ display: 'flex' }}>
    <SideNav open={isOpen} handleToggle={handleToggle} />
    <div style={{
      marginLeft: isOpen ? '220px' : '90px',
      padding: '10px', width: '100%', transition: 'margin 0.3s ease'
    }}>
      <div style={{ height: "93vh", backgroundColor: "white", borderRadius: "10px", padding: "10px", marginLeft: "10px", marginRight: "10px",overflow:"auto" }}>

      <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2} >
        {/* Left side */}
        <Grid md={6} sm={12} xs={12} padding="10px" spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">Property Name / ID</Typography>
            
            < InputField  id=" outlined-basic" label="Input Field 1"  size="small" />
        
          </Grid>
          <Grid item xs={12} md={12} sm={12} marginTop={3} >
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
        </Grid>


        {/* Right side */}
        <Grid md={6} paddingLeft="25px" paddingY="10px" container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">Property Type</Typography>
            <TextField label="Property Type" select fullWidth margin="dense" size="small">
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">Address</Typography>
            <TextField label="Address" fullWidth margin="dense" size="small" />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">City</Typography>
            <TextField label="City" fullWidth margin="dense" size="small" />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">State</Typography>
            <TextField label="State" fullWidth margin="dense" size="small" />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">Country</Typography>
            <TextField label="Country" fullWidth margin="dense" size="small" />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">Pincode</Typography>
            <TextField label="Pincode" fullWidth margin="dense" size="small" />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">Time Zone</Typography>
            <TextField label="Time Zone" select fullWidth margin="dense" size="small">
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Grid>
     

      <Box sx={{ marginTop: '20px', gap:"10px",display:"flex",justifyContent:"center" }}>
        <CustomButton onClick={() => handleTableRowClick()}>Back</CustomButton>
        <CustomButton>Save</CustomButton>
      </Box>

    </Box>
</div>
</div>
</div>
  );
};

export default AddProperty;
