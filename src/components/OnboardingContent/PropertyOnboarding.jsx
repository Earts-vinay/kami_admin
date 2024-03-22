import React, { useState } from 'react';
import { Box, Grid, TextField, MenuItem, Typography, InputAdornment, InputLabel, Select, Button } from '@mui/material';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import SearchIcon from '@mui/icons-material/Search';
import CustomSearch from '../CommonComponent/CustomSearch';
import CustomTextField from '../CommonComponent/CustomTextField';
import CustomDropdown from '../CommonComponent/CustomDropdown';
import Autocomplete from '@mui/material/Autocomplete';
import { Country, State, City } from 'country-state-city';
import { FormControl } from '@mui/base';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectToken } from '../../redux/apiResponse/loginApiSlice';


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

  const token = useSelector(selectToken);

  const [timeDifference, setTimeDifference] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const [pincode, setPincode] = useState('');

  console.log(propertyType);
  console.log(searchQuery);


  const handlePropertyNameChange = (event) => {
    console.log("Property Name:", event.target.value);
    setPropertyName(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    console.log("Search Query:", event.target.value);
    setSearchQuery(event.target.value);
  };

  // const handleCountryChange = (_, { value }) => {
  //   // Destructure the `value` object from the second argument
  //   if (value && value.name) {
  //     const countryName = value.name;
  //     console.log("Selected Country Name:", countryName);
  //     setSelectedCountry(value);
  //   } else {
  //     console.error("Selected country does not contain a name property:", value);
  //   }
  // };
  

  const handleAddressChange = (event) => {
    console.log("Address:", event.target.value);
    setAddress(event.target.value);
  };

  const handleCityChange = (event) => {
    console.log("City:", event.target.value);
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    console.log("State:", event.target.value);
    setState(event.target.value);
  };

  const handlePincodeChange = (event) => {
    console.log("Pincode:", event.target.value);
    setPincode(event.target.value);
  };

  const handleTimeDifferenceChange = (event) => {
    console.log("Time Difference:", event.target.value);
    setTimeDifference(event.target.value);
  };
  
  const countries = Country.getAllCountries();
  const countryOptions = countries.map((country) => ({ value: country, label: country.name }));

  const handleSaveOrUpdate = () => {
    const payload = new URLSearchParams({
      name: propertyName,
      type_id: propertyType,
      address: address,
      city: city,
      state: state,
      country: country,
      pin_code: pincode,
      timezone: timeDifference
    });
  
    const url = 'http://35.239.192.201:9092/api/property';
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload.toString()
    })
    .then(response => {
      if (response.ok) {
        toast.success('Property saved successfully');
        // Redirect or perform any action upon successful save
      } else {
        response.text().then(errorMessage => {
          toast.error(errorMessage || 'Failed to save property');
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      toast.error('An error occurred while processing your request');
    });
  };
  

  // console.log(dropdownData);
  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Left side */}
        <Grid md={7} sm={12} xs={12} padding="15px" spacing={2}>
        <Grid item xs={12} md={12}>
          <CustomTextField label="Property Name / ID" value={propertyName} onChange={handlePropertyNameChange} />
        </Grid>
        <Grid item xs={12} md={12} marginTop={3}>
          <CustomSearch label="Search by name or location" value={searchQuery} onChange={handleSearchQueryChange} />
        </Grid>

          <Box marginTop={2}>
            <MapContainer />
          </Box>
          {/* Map */}
          {/* Implement your map component here */}
        </Grid>

        {/* Right side */}
        <Grid item md={5} spacing={2}>
          <Grid container spacing={3} >
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
          <CustomTextField label="Address" value={address} onChange={handleAddressChange} />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField label="City" value={city} onChange={handleCityChange} />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField label="State" value={state} onChange={handleStateChange} />
        </Grid>
            {/* <Grid item xs={12}>
              <FormControl>
                <Autocomplete
                  options={countryOptions}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  getOptionLabel={(option) => option?.label || ''}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "6px",
                      fontFamily: "montserrat-regular"
                    },
                  }}
                  renderInput={(params) => (
                    <CustomTextField {...params} label="Country" />
                  )}
                />
              </FormControl>
            </Grid> */}
             <Grid item xs={12} md={12}>
                    <CustomTextField label="Country" value={country} onChange={handleCountryChange}/>
                </Grid>
            <Grid item xs={12}>
          <CustomTextField label="Pincode" value={pincode} onChange={handlePincodeChange} />
        </Grid>
            <Grid item xs={12}>
              <CustomDropdown label="Time" value={timeDifference}
                onChange={handleTimeDifferenceChange} >
                <MenuItem value="">Select Time Difference</MenuItem>
                <MenuItem value="">Select Time Difference</MenuItem>
                <MenuItem value="-12">UTC-12 (Baker Island Time)</MenuItem>
                <MenuItem value="-11">UTC-11 (Niue Time)</MenuItem>
                <MenuItem value="-10">UTC-10 (Hawaii-Aleutian Standard Time)</MenuItem>
                <MenuItem value="-9">UTC-9 (Alaska Standard Time)</MenuItem>
                <MenuItem value="-8">UTC-8 (Pacific Standard Time)</MenuItem>
                <MenuItem value="-7">UTC-7 (Mountain Standard Time)</MenuItem>
                <MenuItem value="-6">UTC-6 (Central Standard Time)</MenuItem>
                <MenuItem value="-5">UTC-5 (Eastern Standard Time)</MenuItem>
                <MenuItem value="-4">UTC-4 (Atlantic Standard Time)</MenuItem>
                <MenuItem value="-3.5">UTC-3:30 (Newfoundland Standard Time)</MenuItem>
              </CustomDropdown>
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={handleSaveOrUpdate} sx={{ mr: 1, mt: 3 }}>
                Save
              </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PropertyOnboarding;
