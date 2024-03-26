import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Typography, TextField } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useLocation, useNavigate } from 'react-router-dom';
import SideNav from '../../SideNav';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../../redux/sidenav/sidenavSlice';
import CustomButton from '../../CommonComponent/CustomButton';
import ReactMapGL from 'react-map-gl';
import Map, { GeolocateControl, Marker } from "react-map-gl";
import { setAddPoleApiResponse } from '../../../redux/apiResponse/addpoleSlice';
import { selectToken } from '../../../redux/apiResponse/loginApiSlice';
import CustomTextField from '../../CommonComponent/CustomTextField';
import { GoogleMap, LoadScript, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import { toast } from 'react-toastify';
const BaseUrl = process.env.REACT_APP_API_URL


const commonStyles = {
  fontFamily: "montserrat-regular",
};

const MapContainer = () => {


  const mapStyles = {
    height: '350px',
    width: '100%',
    borderRadius: "10px"
  };
  const defaultCenter = {
    lat: 17.4399,
    lng: 78.4983
  }
  const { isLoaded } = useJsApiLoader({
    id: '2baa9d8a0c4e66b5',
    googleMapsApiKey: "AIzaSyCRQBtQkOyqMNr0YheCgm9LVbvjRtnbo6Y"
  })
  const [map, setMap] = React.useState(null)
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(defaultCenter);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])




  const data = [
    { lat: 17.4489, lng: 78.3907 },
    { lat: 17.6788421, lng: 79.6808767 },
    { lat: 17.6788421, lng: 79.6808767 },

  ];

  const hyderabadAreas = [
    {
      lat: 17.4489, // Hitech City latitude
      lng: 78.3907, // Hitech City longitude
    },
    {
      lat: 17.3616, // Charminar latitude
      lng: 78.4747, // Charminar longitude
    },
    {
      lat: 17.4432, // Gachibowli latitude
      lng: 78.3497, // Gachibowli longitude
    },
    {
      lat: 17.4156, // Banjara Hills latitude
      lng: 78.4347, // Banjara Hills longitude
    },
    {
      lat: 17.4399, // Secunderabad latitude
      lng: 78.4983, // Secunderabad longitude
    },
  ];


  return (
    <React.Fragment>
      {
        isLoaded ? (<GoogleMap mapContainerStyle={mapStyles} zoom={6} center={defaultCenter} onLoad={onLoad}
          onUnmount={onUnmount}>
          {/* You can customize the map as needed */}

          {data.map((obj, val) => {
            return <MarkerF key={val} position={obj} />
          })
          }

        </GoogleMap>) : (<div>
          loading...
        </div>)
      }

    </React.Fragment>



  );
};

const ViewPole = () => {
  const navigate = useNavigate();
  const isOpen = useSelector(selectIsSideNavOpen);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedProperty = useSelector(state => state.property.selectedProperty);
  const propertyId = selectedProperty ? selectedProperty.id : null;
  const { rowId } = location.state || {}; 
  const [propertyName, setpropertyName] = useState('');
  const [locationLat, setLocationLat] = useState();
  const [locationLang, SetLocationLang] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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
    console.log(propertyId);
    navigate(`/addpole`);
  };


  const handlesavepole = async () => {
    const formData = new URLSearchParams();
    formData.append('property_id', propertyId);
    formData.append('name', propertyName); 
    formData.append('location_lat', locationLat); 
    formData.append('location_lng', locationLang); 

    try {
      const response = await fetch(`${BaseUrl}pole`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData,
      });

      const data = await response.json();
      console.log("poledata", data);

      dispatch(setAddPoleApiResponse(data));

      if (data.code === 200) {
        navigate(`/addpole`);
        toast.success('Pole saved successfully!');
      }
    } catch (error) {
      console.error('Error saving pole:', error);
      toast.error('An error occurred while saving pole!');
    }
  };

  const updatePoleById = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('name', propertyName);
      formData.append('location_lat', locationLat);
      formData.append('location_lng', locationLang);
  
      const response = await axios.put(`${BaseUrl}pole/${rowId}`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        }
      });
  
      const data = response.data;
      console.log(data);
      if (data.msg === 'ok') {
        console.log(`Pole with ID ${rowId} updated successfully`);
        toast.success(`Pole with ID ${rowId} updated successfully`);
        navigate(`/addpole`);
      } else {
        console.error('Failed to update pole');
      }
    } catch (error) {
      console.error('Error updating pole:', error);
      toast.error('An error occurred while updating pole');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}pole/${rowId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response);
        setpropertyName(response.data.data.name);
        setLocationLat(response.data.data.location_lat);
        SetLocationLang(response.data.data.location_lng)
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

      fetchData();

  }, [rowId]);
  


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: 17.4539766,
        longitude: 78.3948765,
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
              overflow: "auto"
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
              <Typography variant="body-2" style={{ marginRight: '10px', ...commonStyles }}>
                WallMart Supermarket
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: "wrap", gap: '10px' }}>
              <Box sx={{ width: { xs: '100%', sm: "100%", md: '48%' }, padding: '10px' }}>
                <Box paddingBottom={2} style={{ display: rowId ? 'none' : 'block' }}>
                  <CustomTextField label="Pole Id" value={propertyId} />
                </Box>

                <Box paddingBottom={2}>
                  <CustomTextField label="name" value={propertyName} onChange={(e) => setpropertyName(e.target.value)} />
                </Box>
                <Typography variant="body2" sx={commonStyles} py={2}>
                  Mark on Map
                </Typography>
                <Box paddingBottom={2}>
                  <Typography>Latitude</Typography>
                  <CustomTextField value={locationLat} onChange={(e) => setLocationLat(e.target.value)} />
                </Box>
                <Box paddingBottom={2}>
                  <Typography>Longitude</Typography>
                  <CustomTextField  value={locationLang} onChange={(e) => SetLocationLang(e.target.value)} />
                </Box>
              </Box>

              {/* Map */}
              <Box sx={{ width: { xs: '100%', sm: "100%", md: '48%' } }}>
                <MapContainer />
              </Box>
            </Box>

            <Box sx={{ marginTop: '40px', display: "flex", justifyContent: "center", gap: "10px" }}>

              <CustomButton onClick={() => handleviewpole()}>Back</CustomButton>
              <CustomButton onClick={rowId ? updatePoleById : handlesavepole}>
                {rowId ? 'Update' : 'Save'}
              </CustomButton>

            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default ViewPole;
