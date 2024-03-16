import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  Box,
  Typography,
  TextField,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import PlaceIcon from '@mui/icons-material/Place';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../redux/sidenav/sidenavSlice';
import SideNav from '../../components/SideNav';
import { useNavigate } from 'react-router-dom';


const Devices = () => {
  const navigate = useNavigate();
  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleSideNav());
  };

  
  const handleTableRowClick = () => {
    navigate(`/devicesinside`);
  };

  // Example data array
  const data = [
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10, state: "virginia", country: "USA" },
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10, state: "virginia", country: "USA" },
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10, state: "virginia", country: "USA" },
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10, state: "virginia", country: "USA" },
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10, state: "virginia", country: "USA" },
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10, state: "virginia", country: "USA" },
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10, state: "virginia", country: "USA" },
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10, state: "virginia", country: "USA" },
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10, state: "virginia", country: "USA" },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <SideNav open={isOpen} handleToggle={handleToggle} />
      <div style={{ 
        marginLeft: isOpen ? '220px' : '90px',
         padding: '10px', width: '100%', transition: 'margin 0.3s ease' }}>
        <div style={{ height: "93vh", backgroundColor: "white", borderRadius: "10px", padding: "10px", marginLeft: "10px",overflow:'auto' }}>
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

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'rgba(211, 211, 211, 0.3)' }} >
                  <TableCell>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px' }}>Property Name</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px' }}>Polls Installed</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px' }}>Cameras Installed</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px' }}>Active Cameras</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px' }}>Inactive Cameras</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index} onClick={() => handleTableRowClick()}>
                    <TableCell>
                      <Typography variant="body1">
                        {row.propertyName}
                      </Typography>
                      <Typography variant="body2" component="span" sx={{ fontSize: '13px' }}>
                        <FmdGoodOutlinedIcon fontSize="13px" sx={{ color: 'blue', verticalAlign: 'middle', marginRight: 0.5 }} />
                        {row.state}, {row.country}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">{row.pollsInstalled}</TableCell>
                    <TableCell align="center">{row.camerasInstalled}</TableCell>
                    <TableCell align="center">{row.activeCameras}</TableCell>
                    <TableCell align="center">{row.inactiveCameras}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      
    </div>

  );
}

export default Devices;
