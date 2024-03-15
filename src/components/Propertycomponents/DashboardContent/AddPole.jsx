import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../SideNav';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../../redux/sidenav/sidenavSlice';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {
  const mapStyles = {
    height: '70vh',
    width: '100%',
    borderRadius: '10px'
  };

  const defaultCenter = {
    lat: 37.7749,
    lng: -122.4194,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCRQBtQkOyqMNr0YheCgm9LVbvjRtnbo6Y">
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

const AddPole = () => {
  const navigate = useNavigate();
  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleSideNav());
  };

  const handleTableRowClick = () => {
    navigate(`/addproperty`);
  };

  const data = [
    { pole: 23643, latlong: 17.4948788988, cameras: 3, activeCameras: 3 },
    { pole: 23643, latlong: 17.4948788988, cameras: 3, activeCameras: 3 },
    { pole: 23643, latlong: 17.4948788988, cameras: 3, activeCameras: 3 },
    { pole: 23643, latlong: 17.4948788988, cameras: 3, activeCameras: 3 },
  ];

  const handlePair = () => {
    navigate('/pairdevice');
  };

  const openAddPole = () => {
    navigate('/viewpole');
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideNav open={isOpen} handleToggle={handleToggle} />
      <div style={{
        marginLeft: isOpen ? '220px' : '90px',
        padding: '10px', width: '100%', transition: 'margin 0.3s ease'
      }}>

        <Box
       
         
          style={{ height: '90vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px',overflow:"auto" }}
        >

          <Box textAlign="right" >
            <Button variant="outlined" color="primary" onClick={() => openAddPole()} style={{ marginBottom: '20px', textAlign: "right" }}>
              Add Pole
            </Button>
          </Box>

          <Box  flexDirection={{ xs: 'column', md: 'row' }}
          gap="20px"
          alignItems="stretch" sx={{display:"flex"}}>

       
          <Box width={{ xs: '100%', md: '50%' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#80808017" }}>
                  <TableRow>
                    <TableCell>pole ID</TableCell>
                    <TableCell> Lat,Long</TableCell>
                    <TableCell>Zone</TableCell>
                    <TableCell>Cameras</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{row.pole}</TableCell>
                      <TableCell>{row.latlong}</TableCell>
                      <TableCell> -</TableCell>
                      <TableCell sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Button variant="contained" style={{ backgroundColor: "#007acc", color: 'white', borderRadius: "5px" }}>3</Button>
                        <img src="assets/icons/editicon.svg" alt="" width="35px" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box width={{ xs: '100%', md: '50%' }}>
            <MapContainer />
          </Box>
          </Box>
          <Box marginTop={{ xs: '20px', md: '40px' }} textAlign="center">
          <Button variant="outlined" onClick={() => handlePair()} style={{ marginRight: '10px' }}>Pair Device</Button>
        </Box>
        </Box>

       

      </div>
    </div>
  );
};

export default AddPole;
