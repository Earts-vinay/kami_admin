import React from 'react';
import SideNav from '../SideNav';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../redux/sidenav/sidenavSlice';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField, InputAdornment } from '@mui/material';

const DevicesInside = () => {
  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleSideNav());
  };

  // Sample data array
  const data = [
    { id: 1, cameraId: 'cam 12', lat: 40.7128, long: -74.006, poleId: 'p-123', lines: ['li-2'], polygons: ['p0-3'], detection: 'image_path_1' },
    { id: 2, cameraId: 'cam 15', lat: 34.0522, long: -118.2437, poleId: 'p-456', lines: ['li-3'], polygons: ['p0-5'], detection: 'image_path_2' },
    // Add more data as needed
  ];

  return (
    <>
      <div style={{ display: 'flex' }}>
        <SideNav open={isOpen} handleToggle={handleToggle} />
        <div style={{ 
          marginLeft: isOpen ? '220px' : '90px',
          padding: '10px', width: '100%', transition: 'margin 0.3s ease' }}>
            <div style={{ height: "93vh", backgroundColor: "white", borderRadius: "10px", padding: "10px", marginLeft: "10px", marginRight: "10px" }}>

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
                <TableRow sx={{ background: 'rgba(211, 211, 211, 0.3)' }}>
                  <TableCell>Camera ID</TableCell>
                  <TableCell>Latitude, Longitude</TableCell>
                  
                  <TableCell>Pole ID</TableCell>
                  <TableCell>Lines</TableCell>
                  <TableCell>Polygons</TableCell>
                  <TableCell>Detection</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.cameraId}</TableCell>
                    <TableCell>{item.lat}, {item.long}</TableCell>
                   
                    <TableCell>{item.poleId}</TableCell>
                    <TableCell>{item.lines.join(', ')}</TableCell>
                    <TableCell>{item.polygons.join(', ')}</TableCell>
                    <TableCell><img src='assets/images/carx.svg' /></TableCell>
                    <TableCell>
                      {/* Add edit and delete actions */}
                      {/* For example: */}
                      <span> <img src="assets/icons/editicon.svg" alt="" width="35px" /></span> <span> <img src="assets/icons/deleteicon.svg" alt="" width="35px" /></span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        </div>
      </div>
    </>
  );
};

export default DevicesInside;



