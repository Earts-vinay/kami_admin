


import React, { useEffect, useRef, useState } from 'react';
import { Box, TextField, Button, MenuItem, FormControl, InputAdornment, InputLabel, Select, Input, Typography, Grid } from '@mui/material';
import SideNav from '../../components/SideNav';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../redux/sidenav/sidenavSlice';
import { MuiTelInput } from 'mui-tel-input';
import CustomButton from '../CommonComponent/CustomButton';
import CustomTextField from '../CommonComponent/CustomTextField';
import CustomDropdown from '../CommonComponent/CustomDropdown';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { selectToken } from '../../redux/apiResponse/loginApiSlice';
import { toast } from 'react-toastify';
import HeaderLayout from '../CommonComponent/HeaderLayout';

const BaseUrl = process.env.REACT_APP_API_URL

const commonStyles = {
  fontFamily: "montserrat-regular",
};

const EditUser = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('assets/icons/girlicon.svg');
  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const [phone, setPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [accessLevel, setAccessLevel] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // console.log(isDropdownOpen);
  const [propertyName, setPropertyName] = useState('');

  const dictionaryData = useSelector(state => state.dictionary.data);
  // console.log(dictionaryData);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const handleAccessLevelChange = (event) => {
    setAccessLevel(event.target.value);
  };

  const handlePropertyNameChange = (event) => {
    setPropertyName(event.target.value);
  };

  const { id } = useParams();
  const [userId, setUserId] = useState(id);




  const handleChange = (value) => {
    setPhone(value);
  };

  const handleToggle = () => {
    dispatch(toggleSideNav());
  };
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${BaseUrl}user/${id}`,
        {
          username: "",
          first_name: "",
          last_name: "",
          office_phone: '',
          mobile_phone: ""
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const responseData = response.data;
      console.log('Response:', responseData);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${BaseUrl}user/${id}`,
        {
          username: userName,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.code === 200 && response.data.msg === "ok") {
        console.log("Success: User updated successfully");
        navigate('/users'); // Navigate to "/users" if update is successful
      }
    } catch (error) {
      // Handle error scenario
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    //   console.log('ID:', id);
    // console.log('Token:', token);

    const fetchPropertyData = async () => {
      try {
        const response = await fetch(`http://35.239.192.201:9092/api/user/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data1 = await response.json();
          console.log('User data:', data1);
          const { data } = data1;

          // Extract data from the response and set the state values
          setUserName(data.username);
          setEmail(data.email);
          setAccessLevel(data.role_name);

          // Check if propertys array is not empty before accessing its first element
          if (data.propertys && data.propertys.length > 0) {
            setPropertyName(data.propertys[0].name);
          } else {
            console.warn('No properties found for this user.');
          }

          // toast.success('Property data fetched successfully');
        } else {
          const errorMessage = await response.text();
          console.error('Failed to fetch user data:', errorMessage);
          toast.error(errorMessage || 'Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('An error occurred while fetching user data');
      }
    };


    fetchPropertyData();
  }, []);

  return (
    <HeaderLayout>
      <Box sx={{ display: "flex", gap: "40px", justifyContent: "start", alignItems: "start", }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
          <Box sx={{ padding: '40px', width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px', }}>
            <img src={imageSrc} alt="" width="200px" />
            <Box mt={7} sx={{
              padding: '20px 60px',
              width: "200px", border: '1px solid white', textAlign: 'center', backgroundColor: '#E3EBFC', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)'
            }}>
              {/* Custom Image Upload Label */}
              <Box display="flex" flexDirection="column" gap={2}>
                <InputLabel
                  htmlFor="image-upload"
                  onClick={handleUploadClick}
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    marginTop: '10px',
                    color: 'white',
                    backgroundColor: '#2465E9',
                    padding: '8px 16px',
                    borderRadius: '5px',
                    display: 'inline-block',
                  }}
                >
                  Upload Image
                </InputLabel>

                <Box flexDirection='column' display="flex">
                  <Typography variant='body2' sx={{ color: '#A9A8AA', fontSize: '12px' }}>Preferred File 512*512</Typography>
                  <Typography variant='body2' sx={{ color: '#A9A8AA', fontSize: '12px' }}>Format Supported .jpg & .png</Typography>
                </Box>

              </Box>
              {/* Hidden File Input */}
              <Input
                type="file"
                id="image-upload"
                inputProps={{ accept: 'image/*' }}
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </Box>
          </Box>
        </Box>



        <Grid container spacing={2} style={{ marginTop: '20px', padding: "40px", width: '80%' }}>
          {/* User Information and Save Button Section */}
          <Grid item xs={12} md={7}>
            <CustomTextField
              label="User Name"
              value={userName}
              onChange={handleUserNameChange}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <CustomTextField
              label="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            {/* <Typography variant="body1" sx={commonStyles}>Phone Number</Typography> */}
            <MuiTelInput
              label="Phone Number"
              value={phone || ''}
              onChange={handleChange}
              fullWidth
              margin="dense"
              variant="outlined"
              defaultCountry="US"
              inputProps={{ maxLength: 15, sx: { height: "30px" } }}

              size="small"
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2465E9' } } }}

            />

          </Grid>
          <Grid item xs={12} md={7}>
            <CustomDropdown
              label="Access Level"
              value={accessLevel}
              onChange={handleAccessLevelChange}
              onOpen={handleDropdownOpen}
              onClose={handleDropdownClose}
            >
              {!isDropdownOpen && (
                <MenuItem value={accessLevel}>{accessLevel}</MenuItem>
              )}
              {isDropdownOpen && dictionaryData && dictionaryData.data && dictionaryData.data.property_types && dictionaryData.data.property_types.map(propertyType => (
                <MenuItem key={propertyType.id} value={propertyType.name}>{propertyType.name}</MenuItem>
              ))}
            </CustomDropdown>

          </Grid>
          <Grid item xs={12} md={7}>
            <CustomDropdown
              label="Property Name"
              value={propertyName}
              onChange={handlePropertyNameChange}
            >
              <MenuItem value={propertyName}>{propertyName}</MenuItem>
            </CustomDropdown>
          </Grid>
        </Grid>
      </Box>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>

      {userId ? (
        <CustomButton onClick={handleUpdate}>Update</CustomButton>
      ) : (
        <CustomButton onClick="">Save</CustomButton>
      )}
      </Grid>
      {/* <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <CustomButton>Save</CustomButton>
      </Grid> */}
    </HeaderLayout>

  );
};

export default EditUser;
