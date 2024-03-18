import React, { useState,useEffect} from 'react';
import { Box, Grid, Button, Typography, TextField } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../SideNav';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../../redux/sidenav/sidenavSlice'; 
import CustomButton from '../../CommonComponent/CustomButton';
import ReactMapGL from 'react-map-gl';
import Map  ,{GeolocateControl,Marker}  from "react-map-gl";
import {setAddPoleApiResponse} from '../../../redux/apiResponse/addpoleSlice';


const commonStyles = {
  fontFamily: "montserrat-regular",
};


const ViewPole = () => {
  const navigate = useNavigate();
  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();
  const [propertyId, setpropertyId] = useState('');
  const [locationLat, setLocationLat] = useState();
  const [locationLang, SetLocationLang] = useState();
  const [token, setToken] = useState('');
  const storedToken = localStorage.getItem('token');

console.log('storedToken' ,storedToken);
  const [viewport, setViewport] = React.useState({
    
    width: '500px',
    height: '500px',
    latitude: 17.4539766,
    longitude: 78.3948765,
    zoom: 9,
    maxZoom: 16,
    pitch: 50,
    bearing: 0,
  });


  const handleToggle = () => {
    dispatch(toggleSideNav());
  };

  const handleviewpole = () => {
    navigate(`/addpole`);
  };
 
 
  const handlesavepole = async () => {
  

    const formpoleData = new URLSearchParams();
    formpoleData.append('property_id', propertyId);
    formpoleData.append('name', 'hyderabad');
    formpoleData.append('location_lat', locationLat);
    formpoleData.append('location_lng',locationLang);

    try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/api/pole `, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${storedToken}`
          },
            body: formpoleData,
        });

        const data = await response.json();
        console.log("poledata", data)

         dispatch(setAddPoleApiResponse(data));

        const newToken = data?.data?.token; 
        localStorage.setItem('token', newToken);
        setToken(newToken);

        // if (data.code !== 200) {
        //     toast.error(data.msg);
        // } else {
        //     callTokenAPI(newToken);
        // }
    } catch (error) {
        console.error('Error logging in:', error);
        // toast.error('An error occurred while logging in');
    }
};
useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: 17.4539766,
        longitude:78.3948765 ,
        zoom: 3.5,
      });
    });
  }, []);
  return (
    <>
      <div style={{ display: 'flex' }}>
        <SideNav open={isOpen} handleToggle={handleToggle} />
        <div
          style={{
            marginLeft: isOpen ? '220px' : '90px',
            padding: '10px',
            width: '100%',
            transition: 'margin 0.3s ease',
          }}
        >
          <Box
            style={{
              height: '90vh',
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '10px',
              overflow:"auto"
            }}
          >
            <Box
              textAlign="left"
              display="flex"
              alignItems="center"
              cursor="pointer"
              py={2}
              onClick={() => handleviewpole()}
            >
              <ChevronLeftIcon />
              <Typography variant="body-2" style={{ marginRight: '10px',...commonStyles }}>
                WallMart Supermarket
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap:"wrap", gap: '10px' }}>
              <Box sx={{ width: { xs: '100%',sm:"100%", md: '48%' }, padding: '10px' }}>
                <Box paddingBottom={2}>
                  <Typography variant="body2" sx={commonStyles} >Pole ID</Typography>
                  <TextField label="Pole Id" fullWidth margin="dense" size="small" value={propertyId} onChange={(e) => setpropertyId(e.target.value)} />
                </Box>
                <Typography variant="body2" sx={commonStyles} py={2}>
                  Mark on Map
                </Typography>
                <Box paddingBottom={2}>
                  <Typography variant="body2" sx={commonStyles}>Lat</Typography>
                  <TextField label="Pole Id" fullWidth margin="dense" size="small" value={locationLat} onChange={(e)=>setLocationLat(e.target.value)} />
                </Box>
                <Box paddingBottom={2}>
                  <Typography variant="body2" sx={commonStyles}>Long</Typography>
                  <TextField label="Pole Id" fullWidth margin="dense" size="small" value={locationLang} onChange={(e)=>SetLocationLang(e.target.value)} />
                </Box>
              </Box>

              {/* Map */}
              <Box sx={{ width: { xs: '100%',sm:"100%", md: '48%' } }}>
              <Map
        mapboxAccessToken="pk.eyJ1Ijoic2FiaXRoYWthdGhpcmVzYW4iLCJhIjoiY2x0d210YndzMDE5YzJycDRrbmducDc3ciJ9.6-UYL7597oVdkkeFdOFp2A"
        initialViewState={{
          longitude: 78.3948765,
          latitude: 17.4539766,
          zoom: 12,
         
        
        }}
        style={{width: 500, height: 350}}
        attributionControl={false}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
{/*       
        <Marker
                    latitude={locationLat} // Convert to float if necessary
                    longitude={locationLang} // Convert to float if necessary
                    zoom={10}
                  >
                    <img src='assets\images\loc.png' width="30px"></img>
                    <div></div>
                  </Marker> */}
      </Map>
              </Box>
            </Box>

            <Box sx={{ marginTop: '40px',display:"flex", justifyContent:"center", gap:"10px" }}>
             
              <CustomButton onClick={() => handleviewpole()}>Back</CustomButton>
              <CustomButton onClick={()=>handlesavepole()}>Save</CustomButton>
      
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default ViewPole;
