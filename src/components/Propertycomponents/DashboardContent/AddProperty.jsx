import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, MenuItem, Typography, InputAdornment } from '@mui/material';
import { LoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { selectIsSideNavOpen, toggleSideNav } from '../../../redux/sidenav/sidenavSlice';
import { selectFetchDataSuccess } from '../../../redux/apiResponse/dictionarySlice';
import InputField from '../../CommonComponent/InputField';
import CustomButton from '../../CommonComponent/CustomButton';
import SideNav from '../../SideNav';
import { selectToken } from '../../../redux/apiResponse/loginApiSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomTextField from '../../CommonComponent/CustomTextField';
import CustomSearch from '../../CommonComponent/CustomSearch';
import CustomDropdown from '../../CommonComponent/CustomDropdown';
import HeaderLayout from '../../CommonComponent/HeaderLayout';

const commonStyles = {
  fontFamily: "montserrat-regular",
};

const MapContainer = () => {
  const mapStyles = {
    height: '350px',
    width: '100%',
    borderRadius: '10px',
  };

  const defaultCenter = {
    lat: 17.4399,
    lng: 78.4983,
  };

  const locations = [
    { lat: 17.4489, lng: 78.3907 }, // Hitech City
    { lat: 17.3616, lng: 78.4747 }, // Charminar
    { lat: 17.4432, lng: 78.3497 }, // Gachibowli
    { lat: 17.4156, lng: 78.4347 }, // Banjara Hills
    { lat: 17.4399, lng: 78.4983 }, // Secunderabad (Default Center)
  ];

  return (
    <LoadScript googleMapsApiKey="AIzaSyAp3UpXOj22Gy-w1I7gF2k6I3AYqglEqvw">
      <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
        {/* Render markers for each location */}
        {locations.map((location, index) => (
          <MarkerF key={index} position={location} />
        ))}
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
  const [propertyType, setPropertyType] = useState({});
  const [propertyType1, setPropertyType1] = useState("");
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
      return dictionaryData.data.property_types.map(type => ({ id: type.id, name: type.name }));
    } else {
      return [];
    }
  };

  const propertyTypes = useSelector(selectPropertyTypes);

  console.log(propertyTypes);

  const handleTableRowClick = () => {
    navigate(`/organization`);
  };

  const handlePropertyChange = (event) => {
    const newValue = event.target.value;
    setPropertyName(newValue);
  };

  const handlePropertyTypeChange = (event) => {
    const selectedType = propertyTypes.find(type => type.id === event.target.value);
    setPropertyType(selectedType);
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

  const handleSaveOrUpdate = () => {
    const payload = new URLSearchParams({
      name: propertyName,
      type_id: propertyType.id,
      // description: searchInput,
      address: address,
      city: '',
      state: state,
      country: country,
      pin_code: pincode,
      timezone: timeZone
    });

    const url = propertyId ? `http://35.239.192.201:9092/api/property/${propertyId}` : 'http://35.239.192.201:9092/api/property';

    const method = propertyId ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload.toString()
    })
      .then(response => {
        if (response.ok) {
          toast.success(propertyId ? 'Property updated successfully' : 'Property saved successfully');
          // navigate(`/organization`);
        } else {
          response.text().then(errorMessage => {
            toast.error(errorMessage || (propertyId ? 'Failed to update property' : 'Failed to save property'));
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('An error occurred while processing your request');
      });
  };



  const { id } = useParams();
  const [propertyId, setPropertyId] = useState(id);
  const [propertyData, setPropertyData] = useState(null);

  useEffect(() => {
    //   console.log('ID:', id);
    // console.log('Token:', token);

    const fetchPropertyData = async () => {
      try {
        const response = await fetch(`http://35.239.192.201:9092/api/property/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPropertyData(data.data);
          setPropertyName(data.data.name);
          setPropertyType1(data.data.type_name);
          setAddress(data.data.address);
          setCity(data.data.city);
          setState(data.data.state);
          setCountry(data.data.country);
          setPincode(data.data.pin_code);
          setTimeZone(data.data.timezone);
          setSearchInput(data.data.description);
          // toast.success('Property data fetched successfully');
        } else {
          const errorMessage = await response.text();
          console.error('Failed to fetch property data:', errorMessage);
          toast.error(errorMessage || 'Failed to fetch property data');
        }
      } catch (error) {
        console.error('Error fetching property data:', error);
        toast.error('An error occurred while fetching property data');
      }
    };

    fetchPropertyData();
  }, []);

  return (
    <HeaderLayout>
      <Box sx={{ padding: "20px" }}>
        <Grid container spacing={2}>
          <Grid md={6} sm={12} xs={12} padding="10px" spacing={2}>
            <Grid item xs={12} md={12}>
              <CustomTextField label="Property Name" value={propertyName} onChange={handlePropertyChange} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} marginTop={3} >
              <CustomSearch label="Search" value={searchInput} onChange={handleSearchInputChange} />
            </Grid>

            <Box marginTop={2}>
              <MapContainer />
            </Box>
          </Grid>

          <Grid md={6} paddingLeft="25px" paddingY="10px" container spacing={2}>
            <Grid item xs={12} md={12}>

              <CustomDropdown
                label="Property Type"
                value={propertyId ? propertyType1 : propertyType.id || ''}
                onChange={(event) => {
                  const selectedType = propertyTypes.find(type => type.id === event.target.value);
                  setPropertyType(selectedType);
                  setPropertyType1(selectedType.name);
                }}
              >
                {propertyId && (
                  <MenuItem value={propertyType1}>{propertyType1}</MenuItem>
                )}

                {propertyTypes.map((type, index) => (
                  !(propertyId && type.id === (propertyId ? propertyType1 : propertyType.id)) && (
                    <MenuItem key={index} value={type.id}>{type.name}</MenuItem>
                  )
                ))}
              </CustomDropdown>


            </Grid>
            <Grid item xs={12} md={12}>
              <CustomTextField label="Address" value={address} onChange={handleAddressChange} />
            </Grid>
            <Grid item xs={12} md={12}>
              <CustomTextField label="City" value={city} onChange={handleCityChange} />
            </Grid>
            <Grid item xs={12} md={12}>
              <CustomTextField label="State" value={state} onChange={handleStateChange} />
            </Grid>
            <Grid item xs={12} md={12}>
              <CustomTextField label="Country" value={country} onChange={handleCountryChange} />
            </Grid>
            <Grid item xs={12} md={12}>
              <CustomTextField label="Pincode" value={pincode} onChange={handlePincodeChange} />
            </Grid>
            <Grid item xs={12} md={12}>
              <CustomDropdown value={timeZone} onChange={handleTimeZoneChange}>
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
              </CustomDropdown  >
            </Grid>
          </Grid>
        </Grid>


        <Box sx={{ marginTop: '20px', gap: "10px", display: "flex", justifyContent: "center" }}>
          <CustomButton onClick={() => handleTableRowClick()}>Back</CustomButton>

          {propertyId ? (
            <CustomButton onClick={handleSaveOrUpdate}>Update</CustomButton>
          ) : (
            <CustomButton onClick={handleSaveOrUpdate}>Save</CustomButton>
          )}
        </Box>

      </Box>
    </HeaderLayout>
  );
};

export default AddProperty;
