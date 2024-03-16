import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SideNav from '../../components/SideNav';
import { useNavigate } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../redux/sidenav/sidenavSlice';

const Settings = () => {
  const navigate = useNavigate();
  
  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleSideNav());
  };

  const handleTableRowClick = () => {
    navigate(`/settingsinside`);
  };

  const data = [
    { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM', state: "virginia", country: "USA" },
    { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM', state: "virginia", country: "USA" },
    { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM', state: "virginia", country: "USA" },
    { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM', state: "virginia", country: "USA" },
    { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM', state: "virginia", country: "USA" },
    { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM', state: "virginia", country: "USA" },
    { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM', state: "virginia", country: "USA" },
  ]  // Assuming data is an array of objects with the required properties
 

  return (
    <>
      <div style={{ display: 'flex' }}>
        <SideNav open={isOpen} handleToggle={handleToggle} />
        <div style={{
           marginLeft: isOpen ? '220px' : '90px',
            padding: '10px', width: '100%', transition: 'margin 0.3s ease' }}>
          <Box style={{ height: '93vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginLeft: '10px', marginRight: '10px' }}>
            <Box>
              <Box sx={{ paddingTop: "10px", textAlign: "end" }}>
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
                    <TableRow sx={{ background: 'rgba(211, 211, 211, 0.3)' }}>
                      <TableCell sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px' }}>Property Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px' }}>Raise Alert</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px' }}>Vehicle Detection</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px' }}>Notification</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px' }}>Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item, index) => (
                      <TableRow key={index} onClick={() => handleTableRowClick()} sx={{ cursor: "pointer" }}>
                        <TableCell>
                          <Typography variant="body1" >
                            {item.name}
                          </Typography>
                          <Typography variant="body2" component="span" sx={{ fontSize: '13px' }}>
                            <FmdGoodOutlinedIcon fontSize="13px" sx={{ color: 'blue', verticalAlign: 'middle', marginRight: 0.5 }} />
                            {item.state}, {item.country}
                          </Typography>
                        </TableCell>
                        <TableCell >{item.alert}</TableCell>
                        <TableCell>{item.detection}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell >{item.notification}</TableCell>
                        <TableCell>{item.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Settings;
