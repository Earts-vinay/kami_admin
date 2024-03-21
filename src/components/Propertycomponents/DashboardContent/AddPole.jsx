import React, { useState ,useEffect} from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../SideNav';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../../redux/sidenav/sidenavSlice';
import { selectToken } from '../../../redux/apiResponse/loginApiSlice';
import CustomButton from '../../CommonComponent/CustomButton';
import Map  ,{GeolocateControl,Marker}  from "react-map-gl";
import { GoogleMap, LoadScript, MarkerF, useJsApiLoader } from '@react-google-maps/api';

const commonStyles = {
  fontFamily: "montserrat-regular",
};
const MapContainer = () => {


  const mapStyles = {
    height: '350px',
    width: '100%',
    borderRadius: "10px"
  };
  const defaultCenter={
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
    {  lat: 17.4489,lng:78.3907 },
    { lat: 17.6788421, lng: 79.6808767},
    { lat:17.6788421, lng: 79.6808767 },
    
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
        isLoaded?(<GoogleMap mapContainerStyle={mapStyles} zoom={6} center={defaultCenter}  onLoad={onLoad}
          onUnmount={onUnmount}>
          {/* You can customize the map as needed */}
        
          {data.map((obj,val)=>{
            return  <MarkerF key={val} position={obj} />
          })
        }
         
        </GoogleMap>):(<div>
          loading...
          </div>)
      }

    </React.Fragment>
    
      
    
  );
};

const AddPole = () => {
  const navigate = useNavigate();
  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [responseData, setResponseData] = useState({ code: 200, msg: 'ok', data: { list: [], total: 0 } });

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

  const handleEditPole = () => {
    navigate(`/viewpole`);
  };

  useEffect(() => {
    const fetchPoleData = async () => {   

      try {
        const response = await fetch(`http://35.239.192.201:9092/api/pole?search=sd`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
         console.log("respon",data)
        } else {
          console.error('Failed to fetch property data:', data.msg);
        }
      } catch (error) {
        console.error('Error fetching property data:', error);
      }
    };

    fetchPoleData();
  }, [token]);

  // const data = [
  //   { pole: 23643, latlong: 17.4948788988, cameras: 3, activeCameras: 3 },
  //   { pole: 23643, latlong: 17.4948788988, cameras: 3, activeCameras: 3 },
  //   { pole: 23643, latlong: 17.4948788988, cameras: 3, activeCameras: 3 },
  //   { pole: 23643, latlong: 17.4948788988, cameras: 3, activeCameras: 3 },
  // ];

  const handlePair = () => {
    navigate('/pairdevice');
  };

  const openAddPole = () => {
    navigate('/viewpole');
  };
    const yourData = [
    { id: 1, lat: 37.7749, lng: -122.4194 },
    { id: 2, lat: 34.0522, lng: -118.2437 },
    // Add more data as needed
  ];

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

          <Box textAlign="right" p={1}>
          
            <CustomButton onClick={() => openAddPole()}>Add Pole</CustomButton>
          </Box>

          <Box  flexDirection={{ xs: 'column', md: 'row' }}
          gap="20px"
          alignItems="stretch" sx={{display:"flex"}}>

       
          <Box width={{ xs: '100%', md: '50%' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#80808017" }}>
                  <TableRow>
                    <TableCell sx={commonStyles}>pole ID</TableCell>
                    <TableCell sx={commonStyles}> Lat,Long</TableCell>
                    <TableCell sx={commonStyles}>Zone</TableCell>
                    <TableCell sx={commonStyles}>Cameras</TableCell>
                    <TableCell ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{height:'380px'}}>
                {responseData.code === 200 && responseData.data.list.length === 0 ? (
        <div style={{textAlign:'center', padding:30}}>No records found</div>
      ) : (
        <div>
          {/* Render your data */}
        </div>
      )}
      {/* Other JSX */}
                  {/* {data.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell sx={commonStyles}>{row.pole}</TableCell>
                      <TableCell sx={commonStyles}>{row.latlong}</TableCell>
                      <TableCell sx={commonStyles}> -</TableCell>
                      <TableCell sx={{ display: "flex", alignItems: "center", gap: "10px", }}>
                        <Button variant="contained" style={{ backgroundColor: "#007acc", color: 'white', borderRadius: "5px" }}>3</Button>
                        <img src="assets/icons/editicon.svg" alt="" width="35px" onClick={handleEditPole} />
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box width={{ xs: '100%', md: '50%' }}>
          <MapContainer />
          </Box>
          </Box>
          <Box marginTop={{ xs: '20px', md: '40px' }} textAlign="center">
         <CustomButton onClick={() => handlePair()}>Pair Devices</CustomButton>
        </Box>
        </Box>
      </div>
    </div>
  );
};

export default AddPole;
