import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { InputAdornment, Select, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { LoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import axios from 'axios';
import { selectToken } from '../../redux/apiResponse/loginApiSlice';
import { setUploadResponse } from '../../redux/onBoarding/onboardingCompanySlice';
import { toast } from 'react-toastify';
import CustomButton from '../CommonComponent/CustomButton';
import CustomTextField from '../CommonComponent/CustomTextField';
import CustomSearch from '../CommonComponent/CustomSearch';
import CustomDropdown from '../CommonComponent/CustomDropdown';
import SearchIcon from '@mui/icons-material/Search';

const BaseUrl = process.env.REACT_APP_API_URL
const commonStyles = {
  fontFamily: "montserrat-regular",

};

const MapContainer = ({ searchLocation }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true); 
  }, []);

  const mapStyles = {
    height: '60vh',
    width: '100%',
    borderRadius: "10px"
  };

  const defaultCenter = {
    lat: 37.7749,
    lng: -122.4194,
  };

  return (
    <div style={{ display: isLoaded ? 'block' : 'none' }}> {/* Render map only when loaded */}
      {isLoaded && (
        <LoadScript googleMapsApiKey="AIzaSyAmaZMMaAgoUxEmbWdg1Xv0d2dSibZcZs8">
          <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={searchLocation || defaultCenter}>
            {/* Display marker only if searchLocation is not null */}
            {searchLocation && <MarkerF position={searchLocation} />}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

const OnboardingCompany = ({ dropdownData }) => {

  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState("");
  const [industryId, setIndustryId] = useState("");
  const [searchValue, setSearchValue] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');
  const [timeDifference, setTimeDifference] = useState('');

  const [searchLocation, setSearchLocation] = useState(null);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleKeyDown = async () => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchValue}&key=AIzaSyAmaZMMaAgoUxEmbWdg1Xv0d2dSibZcZs8`);
      const results = response.data.results;
      console.log('Geocoding Response:', response.data); // Debugging: Log the geocoding response
      if (results && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        console.log('Geocoded Location:', { lat, lng }); // Debugging: Log the geocoded location
        setSearchLocation({ lat, lng });
      } else {
        console.error('Geocode not found for:', searchValue);
      }
    } catch (error) {
      console.error('Error fetching geocode:', error);
    }
  };

  const handleTimeDifferenceChange = (event) => {
    setTimeDifference(event.target.value);
  };
  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
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

  const [logoFiles, setLogoFiles] = useState([]);
  const selectUrls = useSelector(state => state.onboardingcompany.urls);

  const onDrop = useCallback((acceptedFiles) => {
    console.log('Dropped Files:', acceptedFiles);
    setLogoFiles(acceptedFiles);
    handleUpload(acceptedFiles);
  }, []);

  const handleUpload = async (files) => {
    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append('files', file);
      });

      formData.append('fileCloud_path', '');
      formData.append('is_upload_cloud', 'yes');

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      };
      const response = await axios.post(`${BaseUrl}uploads`, formData, { headers });

      dispatch(setUploadResponse(response.data));
      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast.error('Failed to upload file');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const industries = useSelector(state => state.dictionary.data);
  console.log(industries);

  const industryIds = industries && industries.data && industries.data.company_industrys
    ? industries.data.company_industrys.map(industry => industry.id)
    : [];

  // console.log(industryIds);

  const industryid = industryIds.length > 0 ? industryIds[0] : "";

  // console.log(industryid);

  useState(() => {
    setIndustryId(industryid);
  }, [industryid]);


  const handleSave = async () => {
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
          logo_url: selectUrls || [],
          industry_id: parseInt(industryid) || 0,
          timeZone: timeDifference,
          description: searchValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = response.data.data;
      setCompanyName("");
      setAddress("");
      setCity('');
      setState('');
      setCountry('');
      setPincode("");
      setTimeDifference("");
      setIndustryId('')
      toast.success('Company onboarded successfully');
      console.log('Response:', responseData);
    } catch (error) {
      console.error('Error saving company:', error);
    }
  };

  // console.log("dropdown", dropdownData);
  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={3}>

        {/* Company Name */}
        <Grid item xs={7} >
          <CustomTextField label="Company Name" value={companyName} onChange={handleCompanyNameChange} borderColor="green" />
        </Grid>

        <Grid item xs={5}>
          <CustomDropdown label="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)}>
            {dropdownData && dropdownData?.data && dropdownData?.data?.company_industrys && dropdownData?.data?.company_industrys.map((industry) => (
              <MenuItem key={industry.id} value={industry.id}>
                {industry.name}
              </MenuItem>
            ))}
          </CustomDropdown>
        </Grid>

        {/* Logo Upload Section */}
        <Grid item xs={12} padding="0px">
          <Typography variant="body2" sx={commonStyles} marginBottom="10px">Logo</Typography>
          <Box sx={{ background: '#E3EBFC', padding: '8px', borderRadius: "5px" }}>
            <Box
              sx={{

                padding: '20px',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                borderRadius: '5px',
                border: "1px dotted #2465e9"
              }}
            >
              <div {...getRootProps()} style={{ cursor: 'pointer', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '20px', justifyContent: "space-around" }}>
                <input {...getInputProps()} />
                <img src="assets/icons/uploadicon.svg" alt="" />
                <Box>
                  <Typography sx={{ color: '#2465e9', ...commonStyles }}>Drag Your logo here</Typography>
                  <Box display="flex" flexDirection="column">
                    <Typography variant="body-2" sx={commonStyles} >Preferred File 512*512</Typography>
                    <Typography variant="body-2" sx={commonStyles}>Format Supported .jpg & .png</Typography>
                  </Box>
                </Box>
              </div>
              <Typography sx={commonStyles}>- OR -</Typography>
              <Box>
                <CustomButton {...getRootProps()}>
                  <input {...getInputProps()} />
                  Browse Files
                </CustomButton>
              </Box>
            </Box>
          </Box>

        </Grid>

        {/* Left Side */}
        <Grid item md={7} xs={12} paddingX="0px" marginY="8px">
        <TextField
            label="Search by location or name"
            variant="outlined"
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            fullWidth
            sx={{
              "&:hover .MuiOutlinedInput-root": {
                  "& > fieldset": { border: '1px solid #2465e9'},
                },
              "& .MuiOutlinedInput-root": {
                  "& > fieldset": { border: "solid 1px #2465e9"},
                },  }}
                InputLabelProps={{
                  style: { fontFamily: 'montserrat-regular' },
                
                }}
            InputProps={{
              style: {  
                fontFamily: 'montserrat-regular',
                padding: '10px',
                height: '50px',
              },
        
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon sx={{color:"#2465e9"}}/>
            </InputAdornment>
          ),
        }}
          />
         
          {/* Implement Map */}
          <Box marginTop={1}>
          <MapContainer searchLocation={searchLocation} />
          </Box>
        </Grid>

  

        {/* Right Side */}
        <Grid item md={5} xs={12} paddingX="20px">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CustomTextField label="Address" value={address} onChange={handleAddressChange} />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField label="City" value={city} onChange={handleCityChange} />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField label="State" value={state} onChange={handleStateChange} />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField label="Country" value={country} onChange={handleCountryChange} />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField label="Pincode" value={pincode} onChange={handlePincodeChange} />
            </Grid>

            <Grid item xs={12}>
              <CustomDropdown label="Time" value={timeDifference}
                onChange={handleTimeDifferenceChange} >
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
              <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 1, mt: 3 }}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OnboardingCompany;
