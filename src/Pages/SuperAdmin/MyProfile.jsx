import React, { useRef, useState } from 'react';
import { Box, TextField, Button, MenuItem, FormControl, InputAdornment, InputLabel, Select, Input, Typography, Grid } from '@mui/material';
import SideNav from '../../components/SideNav';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../redux/sidenav/sidenavSlice';
import { MuiTelInput } from 'mui-tel-input';
import CustomButton from '../../components/CommonComponent/CustomButton';
import CustomTextField from '../../components/CommonComponent/CustomTextField';
import HeaderLayout from '../../components/CommonComponent/HeaderLayout';

const commonStyles = {
  fontFamily: "montserrat-regular",
};

const MyProfile = () => {
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('assets/icons/girlicon.svg');
  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');

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


  return (

    <HeaderLayout>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "start", alignItems: "start", padding: "30px" }}>
        <Box sx={{ width: { sm: "100%", md: "30%", xs: "100%" }, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px', }}>
          <img src={imageSrc} alt="" width="200px" />
          <Box mt={7} sx={{
            padding: '20px 60px',
            width: "70%", border: '1px solid white', textAlign: 'center', backgroundColor: '#E3EBFC', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)'
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
                  padding: '8px 16px', // Adjust padding as needed
                  borderRadius: '5px', // Add border radius for rounded corners
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
        <Box sx={{ width: { sm: "100%", md: "70%", xs: "100%" } }}>

          <Grid container spacing={2} style={{ marginTop: '20px', padding: "40px", }}>
            {/* User Information and Save Button Section */}
            <Grid item xs={12} md={7}>
              <CustomTextField label="User Name" />
            </Grid>
            <Grid item xs={12} md={7}>
              <CustomTextField label="Email" />
            </Grid>

            <Grid item xs={12} md={7}>
              <MuiTelInput
                label="Phone Number"
                value={phone || ''}
                onChange={handleChange}
                fullWidth
                margin="dense"
                variant="outlined"
                defaultCountry="US"
                inputProps={{ maxLength: 15, sx: { height: "35px" } }}
                size="small"
                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2465E9' } } }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <CustomButton>Save</CustomButton>
      </Grid>
    </HeaderLayout>
  );
};

export default MyProfile;
