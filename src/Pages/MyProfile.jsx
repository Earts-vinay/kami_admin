import React, { useRef, useState } from 'react';
import { Box, TextField, Button, MenuItem, FormControl, InputLabel, Select, Input, Typography, Grid } from '@mui/material';
import SideNav from '../components/SideNav';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../redux/sidenav/sidenavSlice';


const MyProfile = () => {
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('assets/icons/girlicon.svg');
  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();

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
    <div style={{ display: 'flex' }}>
      <SideNav open={isOpen} handleToggle={handleToggle} />
      <div style={{
        marginLeft: isOpen ? '220px' : '90px', padding: '10px', width: '100%', transition: 'margin 0.3s ease'
      }}>

        <Box sx={{ display: "flex", gap: "40px", justifyContent: "start", alignItems: "start", height: "93vh", backgroundColor: "white", borderRadius: "10px", padding: "10px", marginLeft: "10px", marginRight: "10px" }}>
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
          </Box>



          <Grid container spacing={2} style={{ marginTop: '20px', padding: "40px", width: '80%' }}>
            {/* User Information and Save Button Section */}
            <Grid item xs={12} md={7}>
              <Typography variant="body1">User Name</Typography>
              <TextField
                label="User Name"
                variant="outlined"
                fullWidth
                margin="dense"
                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2465E9' } } }}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="body1">Email</Typography>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="dense"
                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2465E9' } } }}

              />
            </Grid>

            <Grid item xs={12} md={7}>
              <Typography variant="body1">Access Level</Typography>
              <FormControl fullWidth margin="dense" sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2465E9' } } }}>
                <InputLabel id="access-level-label">Access Level</InputLabel>
                <Select
                  labelId="access-level-label"
                  label="Access Level"
                  defaultValue=""
                  variant="outlined"
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="super-admin">Super Admin</MenuItem>
                </Select>
              </FormControl>

            </Grid>

            <Grid item xs={12} md={7}>
              <Typography variant="body1">Property Name</Typography>
              <FormControl fullWidth margin="dense" sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2465E9' } } }}>
                <InputLabel id="property-name-label">Property Name</InputLabel>
                <Select
                  labelId="property-name-label"
                  label="Property Name"
                  defaultValue=""
                >
                  <MenuItem value="mui">Mui</MenuItem>
                  {/* Add more property names as needed */}
                </Select>
              </FormControl>
            </Grid>

            {/* Save Button */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>

    </div>

  );
};

export default MyProfile;
