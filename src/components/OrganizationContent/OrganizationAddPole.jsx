import React, { useState } from 'react'
import SideNav from '../SideNav'
import { Box, Grid, Button,TextField} from '@mui/material';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const mapContainerStyle = {
    width: '700px',
    height: '500px',
  };
  
  const center = {
    lat: 7.2905715, // default latitude
    lng: 80.6337262, // default longitude
  };
  

const OrganizationAddPole = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const handleToggle = () => {
        setOpen(!open);
      };
    const openOrganizationPole = () =>{
        navigate("/oganization/pole")
    }
      const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyC-5nyue-_mpTnrAgQ1LfunsNnLlIumhZI',
    
      });

      if (loadError) {
        return <div>Error loading maps</div>;
      }
    
      if (!isLoaded) {
        return <div>Loading maps</div>;
      }

    return(
        <div style={{ display: 'flex' }}>
        <SideNav open={open} handleToggle={handleToggle} />
        <div style={{ marginLeft: open ? '232px' : '70px', padding: '10px', width: '100%', transition: 'margin 0.3s ease' }}>
          <Box style={{ height: '90vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginLeft: '10px', marginRight: '10px' }}>
          
            <Grid container >
  
              <Grid xs={5} className='location-spacing'>
                <Card sx={{ minWidth: 275, display: 'flex', borderColor: '#F8F9F9', boxShadow: '0' }} >
                <CardContent sx={{ flex: '1 0 auto', padding: '8px', pb: "0px" }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  
                  {/* <ChevronLeftIcon style={{fontSize:"16px"}}  /> */}
                        
                   
                      <Typography component="div" sx={{ fontSize: 14, color: "#3c4043c9" }} >
                        WalMart Super Market
                      </Typography>
                      
                      <Typography component="div" style={{ display: 'flex', flexDirection: 'row' }}>
                        <LocationOnIcon fontSize='10' color='primary' className='location-icon' />
                        <Typography sx={{ fontSize: 12 }} className='location-name'>
                          Virginia, USA
                        </Typography>
                      </Typography>
                   
                      </Box>
                  </Box>
                  </CardContent>
                </Card>
                <Grid item xs={12} md={12}>
            <Typography variant="body1"  style={{color:"#80808099"}} sx={{ fontSize: 14, color: "#3c4043c9",paddingTop:"10px"}}>pole ID</Typography>
            <TextField
              label="Pole 245" 
              variant="outlined"
              fullWidth
              margin="dense"
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2465E9' } } }}
            />
          </Grid>
          <Grid>
          <Typography variant="body1"  style={{color:"black"}} sx={{ fontSize: 14, color: "#3c4043c9",paddingTop:"10px"}}>Mark On Map</Typography>
            
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body1"  style={{color:"#80808099"}} sx={{ fontSize: 14, color: "#3c4043c9",paddingTop:"10px"}}>Lat</Typography>
            <TextField
              label="17.89909" 
              variant="outlined"
              fullWidth
              margin="dense"
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2465E9' } } }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body1"  style={{color:"#80808099"}} sx={{ fontSize: 14, color: "#3c4043c9",paddingTop:"10px"}}>Long</Typography>
            <TextField
              label="78.89909" 
              variant="outlined"
              fullWidth
              margin="dense"
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2465E9' } } }}
            />
          </Grid>
              </Grid>
              <Grid item xs={7} className='map-spacing'>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={10}
                  center={center}
                >
                  <Marker position={center} />
                </GoogleMap>
             
              <Grid style={{float:"right",paddingRight:"2   90px",marginRight:"290px", paddingTop:"20px",display:"flex", flexDirection:"row"}}> 
            <Grid >
            <Button variant="outlined" color="primary" style={{ marginTop: '20px' }}  onClick={openOrganizationPole}>
              Cancel
            </Button>
            </Grid>
            <Grid style={{paddingLeft:"20px"}}>
            <Button variant="contained" color="primary" style={{ marginTop: '20px' }} >
              Save
            </Button>
            </Grid>
            </Grid>
            </Grid>
            </Grid>

  
          </Box>
        </div>
      </div>
  
    )
    
}
export default OrganizationAddPole;