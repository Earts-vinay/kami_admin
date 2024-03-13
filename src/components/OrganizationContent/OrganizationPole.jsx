import React, { useState } from 'react'
import SideNav from '../SideNav';
import { Box, Grid, Button} from '@mui/material';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useNavigate } from 'react-router-dom';


const OrganizationPole = () =>{

    
    const data = [
         { pole: 23643, latlong: 17.4948788988, cameras: 3, activeCameras: 3 },
        { pole: 23643, latlong: 17.4948788988, cameras: 3, activeCameras: 3},
        { pole:23643, latlong: 17.4948788988, cameras: 3, activeCameras: 3 },
        { pole: 23643,latlong: 17.4948788988, cameras: 3, activeCameras: 3},
        ];
      
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    
  const handleToggle = () => {
    setOpen(!open);
  };

  const mapContainerStyle = {
    width: '700px',
    height: '500px',
  };
  
  const center = {
    lat: 7.2905715, // default latitude
    lng: 80.6337262, // default longitude
  };
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC-5nyue-_mpTnrAgQ1LfunsNnLlIumhZI',

  });
  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }
  const openAddPole = () =>{
    navigate('/organization/addpole');
  }
    return(
        <div style={{ display: 'flex' }}>
        <SideNav open={open} handleToggle={handleToggle} />
        <div style={{ marginLeft: open ? '232px' : '70px', padding: '10px', width: '100%', transition: 'margin 0.3s ease' }}>
          <Box style={{ height: '90vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginLeft: '10px', marginRight: '10px' }}>
          
          <Grid>
            <Box sx={{ paddingTop: "10px", paddingRight: "30px", textAlign: "end" }}>
              <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }} onClick={openAddPole} >
                Add Pole 
              </Button>
            </Box>
          </Grid>
          <Grid container >

            <Grid xs={5} className='location-spacing'>
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
            </Grid>
            <Grid item xs={7} className='map-spacing'>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
              >
                <Marker position={center} />
              </GoogleMap>
            </Grid>
          </Grid>
  
          </Box>
        </div>
      </div>
  
    )
}
export default OrganizationPole;