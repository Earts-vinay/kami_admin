import React, { useState } from 'react';
import { Box, Grid, TextField, MenuItem, Typography, InputAdornment } from '@mui/material';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { selectIsSideNavOpen, toggleSideNav } from '../../../redux/sidenav/sidenavSlice';
import { selectFetchDataSuccess } from '../../../redux/apiResponse/dictionarySlice';
import InputField from '../../CommonComponent/InputField';
import CustomButton from '../../CommonComponent/CustomButton';
import SideNav from '../../SideNav';
import { selectToken } from '../../../redux/apiResponse/loginApiSlice';

const commonStyles = {
  fontFamily: "montserrat-regular",
};

const MapContainer = () => {
  const mapStyles = {
    height: '400px',
    width: '100%',
    borderRadius: "10px"
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
  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);


  const [propertyName, setPropertyName] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');
  const [timeZone, setTimeZone] = useState('');


  const handleToggle = () => {
    dispatch(toggleSideNav());
  };

  const selectDictionary = state => state.dictionary.data;

  const selectPropertyTypes = state => {
    const dictionaryData = selectDictionary(state);

    if (dictionaryData && Array.isArray(dictionaryData.data.property_types)) {
      return dictionaryData.data.property_types.map(type => type.name);
    } else {
      return [];
    }
  };

  const propertyTypes = useSelector(selectPropertyTypes);

  // console.log(propertyTypes);


  const handleTableRowClick = () => {
    navigate(`/dashboard`);
  };

  const handlePropertyNameChange = (event) => {
    setPropertyName(event.target.value);
  };

  const handlePropertyTypeChange = (event) => {
    setPropertyName(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  const handleTimeZoneChange = (event) => {
    setTimeZone(event.target.value);
  };

  const handleSave = () => {
    // Prepare the payload
    const payload = new URLSearchParams({
      name: propertyName,
      type_id: propertyType,
      searchInput,
      address,
      city,
      state,
      country,
      pincode,
      timeZone
    });
  
    // Call the API here using fetch or your preferred HTTP client library
    fetch('http://35.239.192.201:9092/api/property', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload.toString()
    })
      .then(response => {
        if (response.ok) {
          // Handle success
          console.log('Property saved successfully');
          // Redirect or perform any other action as needed
          navigate(`/organization`);
        } else {
          // Handle error
          console.error('Failed to save property');
        }
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });
  };  


  return (
    <div style={{ display: 'flex' }}>
      <SideNav open={isOpen} handleToggle={handleToggle} />
      <div style={{
        marginLeft: isOpen ? '220px' : '90px',
        padding: '10px', width: '100%', transition: 'margin 0.3s ease'
      }}>
        <div style={{ height: "93vh", backgroundColor: "white", borderRadius: "10px", padding: "10px", marginLeft: "10px", marginRight: "10px", overflow: "auto" }}>

          <Box sx={{ padding: "20px" }}>
            <Grid container spacing={2}>
              {/* Left side */}
              <Grid md={6} sm={12} xs={12} padding="10px" spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2" sx={commonStyles}>Property Name / ID</Typography>

                  <InputField id="outlined-basic" label="Input Field 1" size="small" value={propertyName}
                    onChange={handlePropertyNameChange} />

                </Grid>
                <Grid item xs={12} md={12} sm={12} marginTop={3} >
                  <Typography variant="body2" sx={commonStyles}>Search</Typography>
                  <TextField
                    fullWidth
                    label="Search"
                    fontSize="14px"
                    variant="outlined"
                    style={{ marginBottom: '20px', border: 'solid 1px #2465e9' }}
                    size="small"
                    value={searchInput}
                    onChange={handleSearchInputChange}
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
                  <Typography variant="body2" sx={commonStyles}>Property Type</Typography>
                  <TextField label="Property Type" select fullWidth margin="dense" size="small" value={propertyType}
                    onChange={handlePropertyTypeChange}>
                    {propertyTypes.map((type, index) => (
                      <MenuItem key={index} value={type}>{type}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2" sx={commonStyles}>Address</Typography>
                  <TextField label="Address" fullWidth margin="dense" size="small" value={address}
                    onChange={handleAddressChange} />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2" sx={commonStyles}>City</Typography>
                  <TextField label="City" fullWidth margin="dense" size="small" value={city}
                    onChange={handleCityChange} />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2" sx={commonStyles}>State</Typography>
                  <TextField label="State" fullWidth margin="dense" size="small" value={state}
                    onChange={handleStateChange} />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2" sx={commonStyles}>Country</Typography>
                  <TextField label="Country" fullWidth margin="dense" size="small" value={country}
                    onChange={handleCountryChange} />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2" sx={commonStyles}>Pincode</Typography>
                  <TextField label="Pincode" fullWidth margin="dense" size="small" value={pincode}
                    onChange={handlePincodeChange} />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2" sx={commonStyles}>Time Zone</Typography>
                  <TextField label="Time Zone" select fullWidth margin="dense" size="small" value={timeZone}
                    onChange={handleTimeZoneChange}>
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>


            <Box sx={{ marginTop: '20px', gap: "10px", display: "flex", justifyContent: "center" }}>
              <CustomButton onClick={() => handleTableRowClick()}>Back</CustomButton>
              <CustomButton onClick={handleSave}>Save</CustomButton>
            </Box>

          </Box>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
