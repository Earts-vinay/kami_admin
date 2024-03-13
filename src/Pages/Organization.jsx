import React,{useState} from 'react'
import SideNav from '../components/SideNav'
import { Box, Grid, Button, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import "./style.css";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { padding } from '@mui/system';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const mapContainerStyle = {
  width: '700px',
  height: '500px',
};

const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};


 const Organization = () => {

  const[open , setOpen] = useState(true);
  
  const handleToggle = () => {
    setOpen(!open);
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

  return (
    <div  style={{ display: 'flex' }}> 
       <SideNav open={open} handleToggle={handleToggle} />
      <div style={{ marginLeft: open ? '232px' : '70px', padding: '10px', width: '100%', transition: 'margin 0.3s ease' }}>
      <Box style={{ height: '93vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginLeft: '10px', marginRight: '10px' }}>
        <Grid>
        <Box sx={{ paddingTop: "10px",paddingRight:"30px", textAlign: "end" }}> 
        <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }}>
          Add Property
        </Button>
        </Box>
        </Grid>
      <Grid container >

<Grid  xs={5} className='location-spacing'>
<Card  sx={{ minWidth: 275, display: 'flex' ,backgroundColor:"#F8F9F9", borderColor:'#F8F9F9',boxShadow:'0' }}>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: '1 0 auto',padding:'8px' ,pb:"0px"}}>
        <Typography component="div"  sx={{ fontSize: 14,color:"#3c4043c9"}} >
        WalMart Super Market
        </Typography>
        <Typography component="div" style={{display:'flex', flexDirection:'row'}}>
        <LocationOnIcon  fontSize='10' color='primary' className='location-icon' />  
  <Typography sx={{ fontSize: 12}} className='location-name'>
   Virginia, USA
      </Typography>
      </Typography>
      </CardContent>

    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', pl:10, pb: 1 }}>
    <Button variant="contained" minWidth="0" style={{backgroundColor:"rgb(179, 217, 255)",color:'#0000007a',minWidth:"30px"}} >0</Button>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', pl:4, pb: 1 }}>
    <Button variant="contained" minWidth="0" sx={{pl:"8px",pr:"8px" ,pt:"8px",pb:"8px"}} style={{backgroundColor:"white",color:'#0000007a',minWidth:"38px" , border:"2px solid  #1565c091"}} >
      <BorderColorOutlinedIcon fontSize='14' color='primary'></BorderColorOutlinedIcon>
    </Button>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', pl:4, pb: 1 }}>
    <Typography sx={{ fontSize:'x-large',pt:"15px"}} >
   <KeyboardArrowDownOutlinedIcon   color='primary' ></KeyboardArrowDownOutlinedIcon>
   </Typography>
    </Box>
  </Card>
{/* <Card sx={{ minWidth: 275, backgroundColor:"#F8F9F9", borderColor:'#F8F9F9', padding:1,boxShadow:'0' }}>
<Grid style={{display:'flex', flexDirection:'row'}}> 
<Typography sx={{ fontSize: 14,color:"#3c4043c9"}} >
      WalMart Super Market
      </Typography>
      <Grid sx={{paddingLeft:20}}>
      <Grid sx={{paddingTop:1}}> 
      <Typography sx={{ fontSize: 12}} >0
        </Typography> */}
     {/* <Button variant="contained" minWidth="0" xs={{backgroundColor:"#b3d9ff",color:'black',minWidth:"0px"}} >0</Button> */}
      {/* </Grid>
      </Grid>
      </Grid>
 <Grid style={{display:'flex', flexDirection:'row'}}>
  <LocationOnIcon  fontSize='10' color='primary' className='location-icon' />  
  <Typography sx={{ fontSize: 12}} className='location-name'>
   Virginia, USA
      </Typography>
     
      </Grid>
</Card> */}
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
export default Organization;