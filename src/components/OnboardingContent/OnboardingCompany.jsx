import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { InputAdornment, Select, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { selectToken } from '../../redux/apiResponse/loginApiSlice';

const MapContainer = () => {
  const mapStyles = {
    height: '350px',
    width: '100%',
  };

  const defaultCenter = {
    lat: 37.7749,
    lng: -122.4194,
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

const OnboardingCompany = ({ dropdownData }) => {

  const [logoFiles, setLogoFiles] = useState([]);

  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState("");
  const [uploadResponse, setUploadResponse] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');
  const [timeDifference, setTimeDifference] = useState('');

  const handleTimeDifferenceChange = (event) => {
    setTimeDifference(event.target.value);
  };
  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
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
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const onDrop = useCallback((acceptedFiles) => {
    console.log('Dropped Files:', acceptedFiles);
    setLogoFiles(acceptedFiles);
  }, []);

  const handleUpload = async () => {
    try {
      // console.log(token); 
      const formData = new FormData();

      logoFiles.forEach((file, index) => {
        formData.append('files', file);
      });

      formData.append('fileCloud_path', '');
      formData.append('is_upload_cloud', 'yes');

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      };

      const response = await axios.post('http://35.239.192.201:9092/api/uploads', formData, { headers });

      setUploadResponse(response.data);
    } catch (error) {
      console.error('Error uploading logo:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const industries = useSelector(state => state.dictionary.data?.industrys);

  const handleSave = async () => {

    const industryIds = industries ? industry.id : [];
    try {
      const response = await axios.post(
        'http://35.239.192.201:9092/api/company',
        {
          name: companyName,
          country,
          state,
          city,
          pin_code: pincode,
          address,
          logo_url: uploadResponse?.file_path || '',
          industry_id: industryIds || '',
          timeZone: timeDifference,
          description: '',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = response.data.data;
      setCompanyName(responseData.name);
      setAddress(responseData.address);
      setCity(responseData.city);
      setState(responseData.state);
      setCountry(responseData.country);
      setPincode(responseData.pin_code);
      setTimeDifference(responseData.timezone);

      console.log('Response:', responseData);
    } catch (error) {
      console.error('Error saving company:', error);
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={3}>

        {/* Company Name */}
        <Grid item xs={7}>
          <Typography variant="body2">Company Name</Typography>
          <TextField
            label="Company Name"
            fullWidth
            size="small"
            margin="dense"
            value={companyName}
            onChange={handleCompanyNameChange}
          />
        </Grid>

        <Grid item xs={5}>
          <Typography variant="body2">Industry</Typography>
          <TextField
            label="Dropdown"
            fullWidth
            size='small'
            select
            margin="dense"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            {dropdownData && dropdownData.data && dropdownData.data.industrys && dropdownData.data.industrys.map((industry) => (
              <MenuItem key={industry.id} value={industry.id}>
                {industry.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>


        {/* Logo Upload Section */}
        <Grid item xs={12} padding="0px">
          <Typography variant="body2">Logo</Typography>
          <Box
            sx={{
              background: '#E3EBFC',
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              borderRadius: '10px',
            }}
          >
            <div {...getRootProps()} style={{ cursor: 'pointer', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <input {...getInputProps()} />
              <img src="assets/icons/uploadicon.svg" alt="" />
              <Box>
                <Typography sx={{ color: '#2465e9' }}>Drag Your logo here</Typography>
                <Box display="flex" flexDirection="column">
                  <Typography variant="body-2">Preferred File 512*512</Typography>
                  <Typography variant="body-2">Format Supported .jpg & .png</Typography>
                </Box>
              </Box>
            </div>
            <Box>
              <Button variant="contained" color="primary" onClick={handleUpload}>
                Browse Files
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Left Side */}
        <Grid item md={7} xs={12} paddingX="20px">
          <Typography variant="body2">Search</Typography>
          <TextField
            fullWidth
            label="Search"
            value={searchValue}
            onChange={handleSearchChange}
            fontSize="14px"
            variant="outlined"
            margin="dense"
            style={{ marginBottom: '20px' }}
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

          {/* Implement Map */}
          <Box marginTop={2}>
            <MapContainer />
          </Box>
        </Grid>

        {/* Right Side */}
        <Grid item md={5} xs={12} paddingX="20px">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2">Address</Typography>
              <TextField
                label="Address"
                value={address}
                onChange={handleAddressChange}
                fullWidth
                size='small'
                margin="dense"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2">City</Typography>
              <TextField
                label="City"
                value={city}
                onChange={handleCityChange}
                fullWidth
                size='small'
                margin="dense"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2">State</Typography>
              <TextField
                label="State"
                value={state}
                onChange={handleStateChange}
                fullWidth
                size='small'
                margin="dense"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2">Country</Typography>
              <TextField
                label="Country"
                value={country}
                onChange={handleCountryChange}
                fullWidth
                size='small'
                margin="dense"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2">Pincode</Typography>
              <TextField
                label="Pincode"
                value={pincode}
                onChange={handlePincodeChange}
                fullWidth
                size='small'
                margin="dense"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2">Time Difference</Typography>
              <Select
                label="Time Difference"
                fullWidth
                value={timeDifference}
                onChange={handleTimeDifferenceChange}
                size='small'
                margin="dense"
              >
                <MenuItem value="">Select Time Difference</MenuItem>
                <MenuItem value="-12">UTC-12</MenuItem>
                <MenuItem value="-11">UTC-11</MenuItem>
                <MenuItem value="-10">UTC-10</MenuItem>
                <MenuItem value="-9">UTC-9</MenuItem>
                {/* Add other time differences as needed */}
              </Select>

              <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 1, mt: 3 }}>
                SAVE
              </Button>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OnboardingCompany;



