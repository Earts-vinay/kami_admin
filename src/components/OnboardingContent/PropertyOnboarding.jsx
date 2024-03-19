import React, { useState } from 'react';
import { Box, Grid, TextField, MenuItem, Typography, InputAdornment, InputLabel, Select } from '@mui/material';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import SearchIcon from '@mui/icons-material/Search';
import CustomSearch from '../CommonComponent/CustomSearch';
import CustomTextField from '../CommonComponent/CustomTextField';
import CustomDropdown from '../CommonComponent/CustomDropdown';
import  Autocomplete  from '@mui/material/Autocomplete';
import { Country, State, City } from 'country-state-city';
import { FormControl } from '@mui/base';


const commonStyles = {
  fontFamily: "montserrat-regular",
};

const MapContainer = () => {
  const mapStyles = {
    height: '50vh',
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


const PropertyOnboarding = ({ dropdownData }) => {
  const [propertyType, setPropertyType] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch states based on the selected country
  const handleCountryChange = (_, value) => {
    setSelectedCountry(value);
    setSelectedState(null);
    setCities([]);
  };

  // Fetch cities based on the selected state
  const handleStateChange = (_, value) => {
    setSelectedState(value);
    const stateId = value?.value?.id;
    const cities = stateId ? State.getCities(stateId) : [];
    // Update cities dropdown
    setCities(cities);
  };

  const countries = Country.getAllCountries();
  const countryOptions = countries.map((country) => ({ value: country, label: country.name }));



  // console.log(dropdownData);
  return (
    <Box sx={{ padding: "20px" }}>
    <Grid container spacing={2}>
      {/* Left side */}
      <Grid md={7} sm={12} xs={12} padding="10px" spacing={2}>
          <Grid item xs={12} md={12}>
           <CustomTextField label="Property Name / ID" />
          </Grid>
          <Grid item xs={12} md={12} marginTop={3} >
            <CustomSearch label="search by name or location" />
          </Grid>

          <Box marginTop={2}>
            <MapContainer />
          </Box>
          {/* Map */}
          {/* Implement your map component here */}
        </Grid>

      {/* Right side */}
      <Grid item md={5} padding="10px" spacing={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CustomDropdown label="Property Type" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            {dropdownData && dropdownData.data && dropdownData.data.property_types && dropdownData.data.property_types.map((propertyType) => (
                <MenuItem key={propertyType.id} value={propertyType.id}>
                  {propertyType.name}
                </MenuItem>
              ))}
            </CustomDropdown>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField label="Address" />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField label="City" />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField label="State" />
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <Autocomplete
                options={countryOptions}
                value={selectedCountry}
                onChange={handleCountryChange}
                getOptionLabel={(option) => option?.label || ''}
                sx={{"& .MuiOutlinedInput-root": {
                  padding:"6px",
                  fontFamily:"montserrat-regular"
                },}}
                renderInput={(params) => (
                  <CustomTextField {...params} label="Country" />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField label="Pincode" />
          </Grid>
          <Grid item xs={12}>
            <CustomDropdown label="Time Zone">
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
            </CustomDropdown>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
  );
};

export default PropertyOnboarding;
