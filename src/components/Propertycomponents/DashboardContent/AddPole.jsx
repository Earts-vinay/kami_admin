import React, { useState, useEffect } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import SideNav from '../../SideNav';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../../redux/sidenav/sidenavSlice';
import { selectToken } from '../../../redux/apiResponse/loginApiSlice';
import CustomButton from '../../CommonComponent/CustomButton';
import Map, { GeolocateControl, Marker } from "react-map-gl";
import { GoogleMap, LoadScript, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchDataStart, fetchDataSuccess, fetchDataFailure, selectResponseData, selectLoading, selectError } from '../../../redux/apiResponse/poleSlice';


const BaseUrl = process.env.REACT_APP_API_URL
const commonStyles = {
  fontFamily: "montserrat-regular",
};
// const MapContainer = () => {
//   const mapStyles = {
//     height: '350px',
//     width: '100%',
//     borderRadius: "10px"
//   };
//   const defaultCenter={
//     lat: 17.4399,
//       lng: 78.4983
//   }
//   const { isLoaded } = useJsApiLoader({
//     id: '2baa9d8a0c4e66b5',
//     googleMapsApiKey: "AIzaSyCRQBtQkOyqMNr0YheCgm9LVbvjRtnbo6Y"
//   })
//   const [map, setMap] = React.useState(null)
//   const onLoad = React.useCallback(function callback(map) {
//     // This is just an example of getting and using the map instance!!! don't just blindly copy!
//     const bounds = new window.google.maps.LatLngBounds(defaultCenter);
//     map.fitBounds(bounds);

//     setMap(map)
//   }, [])

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null)
//   }, [])




//   const data = [
//     {  lat: 17.4489,lng:78.3907 },
//     { lat: 17.6788421, lng: 79.6808767},
//     { lat:17.6788421, lng: 79.6808767 },

//   ];

//   const hyderabadAreas = [
//     {
//       lat: 17.4489, // Hitech City latitude
//       lng: 78.3907, // Hitech City longitude
//     },
//     {
//       lat: 17.3616, // Charminar latitude
//       lng: 78.4747, // Charminar longitude
//     },
//     {
//       lat: 17.4432, // Gachibowli latitude
//       lng: 78.3497, // Gachibowli longitude
//     },
//     {
//       lat: 17.4156, // Banjara Hills latitude
//       lng: 78.4347, // Banjara Hills longitude
//     },
//     {
//       lat: 17.4399, // Secunderabad latitude
//       lng: 78.4983, // Secunderabad longitude
//     },
//   ];


//   return (
//     <React.Fragment>
//       {
//         isLoaded?(<GoogleMap mapContainerStyle={mapStyles} zoom={6} center={defaultCenter}  onLoad={onLoad}
//           onUnmount={onUnmount}>
//           {/* You can customize the map as needed */}

//           {data.map((obj,val)=>{
//             return  <MarkerF key={val} position={obj} />
//           })
//         }

//         </GoogleMap>):(<div>
//           loading...
//           </div>)
//       }

//     </React.Fragment>



//   );
// };

const MapContainer = ({ locations }) => {
  const mapStyles = {
    height: '350px',
    width: '100%',
    borderRadius: '10px',
  };

  const defaultCenter = {
    lat: 17.4399,
    lng: 78.4983,
  };

  // const locations = [
  //   { lat: 17.4489, lng: 78.3907 }, // Hitech City
  //   { lat: 17.3616, lng: 78.4747 }, // Charminar
  //   { lat: 17.4432, lng: 78.3497 }, // Gachibowli
  //   { lat: 17.4156, lng: 78.4347 }, // Banjara Hills
  //   { lat: 17.4399, lng: 78.4983 }, // Secunderabad (Default Center)
  // ];

  const responsePoleData = useSelector(selectResponseData);
  console.log("mapresponseData", responsePoleData)

  return (
    <LoadScript googleMapsApiKey="AIzaSyAmaZMMaAgoUxEmbWdg1Xv0d2dSibZcZs8">
      <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
        {/* Render markers for each location */}
        {locations?.map((location, index) => (
          <MarkerF key={index} position={{ lat: parseFloat(location.location_lat), lng: parseFloat(location.location_lng) }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};


const AddPole = () => {
  const navigate = useNavigate();
  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [responseData, setResponseData] = useState(null);
  const responsePoleData = useSelector(selectResponseData);
  // console.log(responsePoleData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  // const [propertyId, setPropertyId] = useState(id);
  const selectedProperty = useSelector(state => state.property.selectedProperty);
  const propertyId = selectedProperty ? selectedProperty.id : null;
  // const { id } = useParams();
  // console.log("Property ID:", id); 


  // const [poleId, setPoleId] = useState(id);
  const [query, setQuery] = useState('Hyderabad');
  const [open, setOpen] = useState(false);
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

  const [deleteDataUpdated, setDeleteDataUpdated] = useState(false)


  const handleDelete = async (poleId) => {
    console.log(poleId);
    try {
      const requestBody = new URLSearchParams({
        id: poleId.toString()
      });

      const response = await axios.delete(`${BaseUrl}pole`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        },
        data: requestBody.toString()
      });

      const data = response.data;
      console.log(data);
      if (data.msg === "ok") {
        console.log(`Record with ID ${poleId} deleted successfully`);
        setDeleteDataUpdated(true);
        toast.success(`Record with ID ${poleId} deleted successfully`);
      } else {
        console.error('Failed to delete record');
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      toast.error('An error occurred while deleting record');
    }
  };

  useEffect(() => {
    dispatch(fetchDataStart());
    try {
      // console.log(id);
      const url = `${BaseUrl}pole?property_id=${propertyId}`;

      const headers = {
        'Authorization': `Bearer ${token}`
      };

      axios.get(url, { headers })
        .then((res) => {
          const { data } = res.data;
          console.log("addpole", res, data);
          if (res.data.code === 200) {
            dispatch(fetchDataSuccess(data));
            toast.success(data.msg);
            // setResponseData(data);
          } else {
            dispatch(fetchDataFailure(data.msg))
            toast.error(data.msg);
          }
        })
        .catch((err) => {
          console.error('Error:', err);
        });
    } catch (error) {
      console.error('Error:', error);
    }
  }, [dispatch, deleteDataUpdated, propertyId, query, token]);

  const handlePair = () => {
    navigate('/pairdevice');
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const openAddPole = () => {
    navigate('/viewpole');
  };

  const openEditPole = (rowId) => {
    navigate('/viewpole', { state: { rowId } });
  };


  const yourData = [
    { id: 1, lat: 37.7749, lng: -122.4194 },
    { id: 2, lat: 34.0522, lng: -118.2437 },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <SideNav open={isOpen} handleToggle={handleToggle} />
      <div style={{
        marginLeft: isOpen ? '220px' : '90px',
        padding: '10px', width: '100%', transition: 'margin 0.3s ease'
      }}>

        <Box


          style={{ height: '93vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px', overflow: "auto" }}
        >

          <Box textAlign="right" p={1}>

            <CustomButton onClick={() => openAddPole()}>Add Pole</CustomButton>
          </Box>

          <Box flexDirection={{ xs: 'column', md: 'row' }}
            gap="20px"
            alignItems="stretch" sx={{ display: "flex" }}>


            <Box width={{ xs: '100%', md: '50%' }}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead style={{ backgroundColor: "#80808017" }}>
                    <TableRow>
                      <TableCell sx={{ ...commonStyles, minWidth: '60px' }}>pole ID</TableCell>
                      <TableCell sx={{ ...commonStyles, minWidth: '150px' }}>Lat, Long</TableCell>
                      <TableCell sx={{ ...commonStyles, minWidth: '60px' }}>Zone</TableCell>
                      <TableCell sx={{ ...commonStyles, minWidth: '130px' }}>Cameras</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {responsePoleData?.list?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ ...commonStyles }}>No records found</TableCell>
                      </TableRow>
                    ) : (
                      <>
                        {responsePoleData?.list?.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ ...commonStyles, minWidth: '60px' }}>{row.id}</TableCell>
                            <TableCell sx={{ ...commonStyles, minWidth: '150px' }}>{row.location_lat}, {row.location_lng}</TableCell>
                            <TableCell sx={{ ...commonStyles, minWidth: '60px' }}>-</TableCell>
                            <TableCell sx={{ ...commonStyles, minWidth: '130px', alignItems: "center", display: "flex", gap: "5px" }}>
                              <Button variant="contained" style={{ backgroundColor: "#007acc", color: 'white', borderRadius: "5px" }}>3</Button>
                              <Box display="flex" gap={0} alignItems="center">

                                <IconButton onClick={() => openEditPole(row.id)}>
                                  <img src="https://hatimi.s3.amazonaws.com/kamiWebsite/editicon.svg" width="35px" alt="edit" />
                                </IconButton>

                                <IconButton color="secondary" onClick={() => handleDelete(row.id)}>
                                  <img src="https://hatimi.s3.amazonaws.com/kamiWebsite/deleteicon.svg" width="35px" alt="edit" />
                                </IconButton>

                              </Box>
                              {/* <img src="assets/icons/editicon.svg" alt="" width="35px" onClick={handleEditPole} />
                <img src="assets/icons/deleteicon.svg" alt="" width="35px" onClick={handledelete} /> */}
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

            </Box>

            <Box width={{ xs: '100%', md: '50%' }}>
              <MapContainer locations={responsePoleData?.list} />
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
