import React, { useState } from 'react'
import SideNav from '../SideNav'
import { Box, Grid, Button, TextField } from '@mui/material';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import InputField  from '../CommonComponent/InputField';


const mapContainerStyle = {
  width: '700px',
  height: '500px',
};

const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};



const OrganizationAddProperty = () =>{

    const [open, setOpen] = useState(true);
    const [retailstore , setRetailStore] = useState('');
    const navigate = useNavigate();
  
    const handleChange = (event) => {
      setRetailStore(event.target.value);
    };
  
  
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
    const openOrganization = () =>{
        navigate('/organization')
    }
return(  

    <div style={{ display: 'flex' }}>
    <SideNav open={open} handleToggle={handleToggle} />
    <div style={{ marginLeft: open ? '232px' : '70px', padding: '10px', width: '100%', transition: 'margin 0.3s ease' }}>
      <Box style={{ height: '110vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginLeft: '10px', marginRight: '10px' }}>
        <Grid container >
          <Grid  xs={8}>
            <Grid  item xs={12} md={12}> 
          <Typography component="div" style={{color:"#80808099"}} sx={{ fontSize: 14, color: "#3c4043c9",paddingBottom:"5px"}} >
                   property Name /ID
                  </Typography>
          {/* <TextField id="outlined-basic" label="Ferguson Real Estate LLP" variant="outlined"     
           sx={{ '& .MuiOutlinedInput-root': { '& fieldset' : { borderColor: '#2465E9',padding:"10px",borderRadius:"10px",color:"#80808099",width:"680px",fontSize:"12px"} } }} />
          */}
          < InputField  id=" outlined-basic" label="Ferguson Real Estate LLP" varient="outlined" sx={{ '& .MuiOutlinedInput-root': { '& fieldset' : { borderColor: '#2465E9',padding:"10px",borderRadius:"10px",color:"#80808099",width:"680px",fontSize:"12px"} } }}/>
         </Grid>
         <Grid  item xs={12} md={12}>
          <Typography component="div" style={{color:"#80808099"}} sx={{ fontSize: 14, color: "#3c4043c9",paddingBottom:"5px",paddingTop:"20px"}} >
                   search
                  </Typography>
          <TextField id="outlined-basic" label="search by location" variant="outlined"   
             sx={{ '& .MuiOutlinedInput-root': { '& fieldset' : { borderColor: '#2465E9',padding:"10px",borderRadius:"10px",color:"#80808099",width:"680px",fontSize:"12px"} } }} />
          </Grid>
          <Typography component="div" sx={{ fontSize: 14, color: "white",paddingBottom:"5px"}} >a
            </Typography>
          <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={center}
             
            >
              <Marker position={center} />
            </GoogleMap>
            <Grid style={{float:"right",paddingRight:"60px",marginRight:"60px", paddingTop:"20px",display:"flex", flexDirection:"row"}}> 
            <Grid >
            <Button variant="outlined" color="primary" style={{ marginTop: '20px' }} onClick={openOrganization}>
              Back
            </Button>
            </Grid>
            <Grid style={{paddingLeft:"20px"}}>
            <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={openOrganization}>
              Save
            </Button>
            </Grid>
            </Grid>
          </Grid>
          <Grid  xs={4}>
          <Typography component="div" style={{color:"#80808099"}} sx={{ fontSize: 14, color: "#3c4043c9",paddingBottom:"5px" }} >
                   property Type
                  </Typography>
            <FormControl fullWidth margin="dense" sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2465E9' } } }}>
              <InputLabel id="property-type-lable">retail Store</InputLabel>
              <Select
                labelId=" property-type-lable"
                label="retail Store"
                defaultValue=""
                variant="outlined"
              >
                <MenuItem value="retail Store">retail Store</MenuItem>
                <MenuItem value="retail Store">retail Store</MenuItem>
              </Select>
            </FormControl>
            <Grid item xs={12} md={12}>
            <Typography variant="body1"  style={{color:"#80808099"}} sx={{ fontSize: 14, color: "#3c4043c9",paddingTop:"10px"}}>Address</Typography>
            <TextField
              label="3-909A/1" 
              variant="outlined"
              fullWidth
              margin="dense"
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2465E9' } } }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body1" style={{color:"#80808099"}}  sx={{ fontSize: 14, color: "#3c4043c9",paddingTop:"10px" }}>City</Typography>
            <TextField
              label="Barbados" 
              variant="outlined"
              fullWidth
              margin="dense"
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2465E9' } } }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body1"  sx={{ fontSize: 14, color: "#3c4043c9",paddingTop:"10px",color:"#80808099" }}>State</Typography>
            <TextField
              label="Virginia" 
              variant="outlined"
              fullWidth
              margin="dense"
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2465E9' } } }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body1"  sx={{ fontSize: 14, color: "#3c4043c9",paddingTop:"10px",color:"#80808099" }}>Country</Typography>
            <TextField
              label="USA" 
              variant="outlined"
              fullWidth
              margin="dense"
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2465E9' } } }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body1"  sx={{ fontSize: 14, color: "#3c4043c9",paddingTop:"10px",color:"#80808099" }}>Pin Code</Typography>
            <TextField
              label="345-356" 
              variant="outlined"
              fullWidth
              margin="dense"
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2465E9' } } }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body1"  sx={{ fontSize: 14, color: "#3c4043c9",paddingTop:"10px",color:"#80808099" }}>Time Zone</Typography>
            <TextField
              label="Pacific GMT +2:30hrs" 
              variant="outlined"
              fullWidth
              margin="dense"
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2465E9' } } }}
            />
          </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  </div>
)
}
export default OrganizationAddProperty;