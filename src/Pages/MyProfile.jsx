import React, { useRef, useState } from 'react';
import { Box, TextField, Button, MenuItem, FormControl, InputLabel, Select, Input, Typography, Grid } from '@mui/material';
import SideNav from '../components/SideNav';

const MyProfile = () => {
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('assets/icons/girlicon.svg');
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  }

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
    <div  style={{ display: 'flex' }}> 
       <SideNav open={open} handleToggle={handleToggle} />
      <div style={{ marginLeft: open ? '250px' : '70px', padding: '10px', width: '100%', transition: 'margin 0.3s ease' }}>

      <Box sx={{ display: "flex", gap: "40px", justifyContent: "start", alignItems: "start", height: "93vh", backgroundColor: "white", borderRadius: "10px", padding: "10px", marginLeft: "10px", marginRight: "10px" }}>
      <Box sx={{padding: '40px',}}>
        <img src={imageSrc} alt="" width="250px" />
        <Box pt={5} sx={{ border: '1px solid white',  textAlign: 'center',background:"linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4))" }}>
          {/* Custom Image Upload Label */}
          <Box display="flex" flexDirection="column" gap={2}>
          <InputLabel
            htmlFor="image-upload"
            style={{ cursor: 'pointer', textDecoration: 'underline', marginTop: '10px' }}
            onClick={handleUploadClick}
          >
            Upload Image
          </InputLabel>
          <Box flexDirection='column' display="flex">
          <Typography variant='body-2'>Preferred File 512*512</Typography>
          <Typography variant='body-2'>Format Supported .jpg & .png</Typography>
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

      <Grid container spacing={2} style={{ marginTop: '20px', padding: "40px" }}>
        {/* User Information and Save Button Section */}
        <Grid item xs={12} md={7}>
          <Typography variant="body1">User Name</Typography>
          <TextField
            label="User Name"
            variant="outlined"
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="body1">Email</Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="dense"
          />
        </Grid>

        <Grid item xs={12} md={7}>
        <Typography variant="body1">Access Level</Typography>
          <FormControl fullWidth margin="dense">
            <InputLabel id="access-level-label">Access Level</InputLabel>
            <Select
              labelId="access-level-label"
              label="Access Level"
              defaultValue=""
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="super-admin">Super Admin</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={7}>
        <Typography variant="body1">Property Name</Typography>
          <FormControl fullWidth margin="dense">
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
        <Grid item xs={12}>
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
