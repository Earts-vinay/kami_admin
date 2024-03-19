import React, { useEffect, useState } from 'react';
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
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomTextField from '../../CommonComponent/CustomTextField';
import CustomSearch from '../../CommonComponent/CustomSearch';
import CustomDropdown from '../../CommonComponent/CustomDropdown';

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
          navigate(`/organization`);
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
    <div style={{ display: 'flex' }}>
      <SideNav open={isOpen} handleToggle={handleToggle} />
      <div style={{
        marginLeft: isOpen ? '220px' : '90px',
        padding: '10px', width: '100%', transition: 'margin 0.3s ease'
      }}>
        <div style={{ height: "93vh", backgroundColor: "white", borderRadius: "10px", padding: "10px", marginLeft: "10px", marginRight: "10px", overflow: "auto" }}>

          <Box sx={{ padding: "20px" }}>
            <Grid container spacing={2}>
              <Grid md={6} sm={12} xs={12} padding="10px" spacing={2}>
                <Grid item xs={12} md={12}>
                  <CustomTextField  label="Property Name" value={propertyName}  onChange={handlePropertyChange}/>
                </Grid>
                <Grid item xs={12} md={12} sm={12} marginTop={3} >
<CustomSearch label="Search"  value={searchInput} onChange={handleSearchInputChange}/>
                </Grid>

                <Box marginTop={2}>
                  <MapContainer />
                </Box>
              </Grid>

              <Grid md={6} paddingLeft="25px" paddingY="10px" container spacing={2}>
                <Grid item xs={12} md={12}>
               
                  <CustomDropdown label="Property Type"  value={propertyId ? propertyType1 : propertyType.id || ''}  onChange={handlePropertyTypeChange}>
                  {propertyId ? (
                      <MenuItem value={propertyType1}>{propertyType1}</MenuItem>
                    ) : (
                      propertyTypes.map((type, index) => (
                        <MenuItem key={index} value={type.id}>{type.name}</MenuItem>
                      ))
                    )}
                  </CustomDropdown>
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField label="Address" value={address}  onChange={handleAddressChange}/>             
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField label="City" value={city}  onChange={handleCityChange}/>
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField label="State" value={state}  onChange={handleStateChange}/>
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField label="Country" value={country} onChange={handleCountryChange}/>
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomTextField label="Pincode" value={pincode}  onChange={handlePincodeChange}/>
                </Grid>
                <Grid item xs={12} md={12}>
                  <CustomDropdown value={timeZone}    onChange={handleTimeZoneChange}>
                  <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
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
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
