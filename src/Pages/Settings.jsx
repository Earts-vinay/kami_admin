import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
const Settings = () => {
  // Assuming data is an array of objects with the required properties
  const data= [
    { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM' },
    { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM' },
    { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM' },
    { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM' },
    { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM' },
]
  
  return (
    <>
      <Box style={{ height: '93vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginLeft: '10px', marginRight: '10px' }}>
        <Box>
        <Box sx={{paddingTop:"10px", textAlign:"end"}}>
   <TextField
              
              label="Search"
              fontSize="14px"
              variant="outlined"
              style={{ marginBottom: '20px', border: 'solid 1px #2465e9', }}
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
   </Box>
        </Box>
        <Box>
          {/* Implement the Material-UI table with dynamic data */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Property Name</TableCell>
                  <TableCell>Raise Alert</TableCell>
                  <TableCell>Vehicle Detection</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Notification</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.alert}</TableCell>
                    <TableCell>{item.detection}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.notification}</TableCell>
                    <TableCell>{item.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
