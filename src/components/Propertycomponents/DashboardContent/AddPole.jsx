import React, { useState ,useEffect} from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../SideNav';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../../redux/sidenav/sidenavSlice';
import { selectToken } from '../../../redux/apiResponse/loginApiSlice';
import CustomButton from '../../CommonComponent/CustomButton';
import Map  ,{GeolocateControl,Marker}  from "react-map-gl";

const commonStyles = {
  fontFamily: "montserrat-regular",
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
          <Map
        mapboxAccessToken="pk.eyJ1Ijoic2FiaXRoYWthdGhpcmVzYW4iLCJhIjoiY2x0d210YndzMDE5YzJycDRrbmducDc3ciJ9.6-UYL7597oVdkkeFdOFp2A"
        initialViewState={{
          longitude: 78.3948765,
          latitude: 17.4539766,
          zoom: 12,
         
        
        }}
        style={{width: 500, height: 420}}
        attributionControl={false}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {/* {yourData.map((dataItem) => (
        <Marker
          key={dataItem.id} // Assuming you have a unique identifier for each marker
          latitude={dataItem.la}
          longitude={dataItem.lng}
          offsetLeft={-20}
          offsetTop={-10}
        >
           <img src='assets\images\loc.png' width="30px"></img>
          <div style={{ color: 'red' }}>Marker</div>
        </Marker>
      ))} */}
      
        <Marker
                    latitude={17.419410} // Convert to float if necessary
                    longitude={78.424347} // Convert to float if necessary
                    zoom={10}
                  >
                    <img src='assets\images\loc.png' width="30px"></img>
                    <div></div>
                  </Marker>
      </Map>
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
