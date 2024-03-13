
import React, { useState } from 'react'
import { Box, Grid, Button} from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../SideNav';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../../redux/sidenav/sidenavSlice';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {
  const mapStyles = {
    height: '350px',
    width: '100%',
  };

  const defaultCenter = {
    lat: 37.7749, // Default latitude
    lng: -122.4194, // Default longitude
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCRQBtQkOyqMNr0YheCgm9LVbvjRtnbo6Y">
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
        {/* You can customize the map as needed */}
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

const AddPole = () =>{
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
        { pole: 23643, latlong: 17.4948788988, cameras: 3, activeCameras: 3},
        { pole:23643, latlong: 17.4948788988, cameras: 3, activeCameras: 3 },
        { pole: 23643,latlong: 17.4948788988, cameras: 3, activeCameras: 3},
        ];
      

        const handlePair = () =>{
          navigate('/pairdevice');
        }

  const openAddPole = () =>{
    navigate('/viewpole');
  }
    return(
        <div style={{ display: 'flex' }}>
        <SideNav open={isOpen} handleToggle={handleToggle} />
        <div style={{
          marginLeft: isOpen ? '220px' : '90px',
          padding: '10px', width: '100%', transition: 'margin 0.3s ease'
        }}>

<Box style={{ height: '90vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginLeft: '10px', marginRight: '10px' }}>
          
<Box textAlign="right" >
          <Button variant="outlined" color="primary" onClick={() => openAddPole()} style={{ marginBottom: '20px', textAlign: "right" }}>
              Add Pole
            </Button>
          </Box>

          <Box sx={{display:'flex', gap:"10px"}}>
<Box sx={{width:"50%"}}>

<TableContainer component={Paper} style={{borderLeft:"0px", borderRight:"0px",boxShadow:"none"}}>
      <Table aria-label="simple table" >
        <TableHead style={{backgroundColor:"#80808017"}}>
          <TableRow>
         <TableCell>pole ID</TableCell>
         <TableCell> Lat,Long</TableCell>
         <TableCell>Cameras</TableCell>
         <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.pole}</TableCell>
              <TableCell>{row.latlong}</TableCell>
              <TableCell> 
                  <Button variant="contained" minWidth="0" style={{ backgroundColor: "#007acc", color: 'white', minWidth: "10px",borderRadius:"20px"}} >3</Button>
                </TableCell>
              <TableCell> <Button variant="contained" minWidth="0" sx={{ pl: "8px", pr: "8px", pt: "8px", pb: "8px" }} style={{ backgroundColor: "white", color: '#0000007a', minWidth: "38px", border: "2px solid  #1565c091" }} >
                    <BorderColorOutlinedIcon fontSize='14' color='primary'></BorderColorOutlinedIcon>
                  </Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

</Box>
        
                
           {/* Map */}
           <Box width="50%">
        <MapContainer />
        </Box>
        </Box>

        <Box sx={{ marginTop: '40px', textAlign: 'center' }}>
      <Button variant="outlined" onClick={() => handlePair()}  style={{ marginRight: '10px' }}>Pair Device</Button>
       
       
      </Box>
          </Box>
        
        </div>
      </div>
  
    )
}
export default AddPole;