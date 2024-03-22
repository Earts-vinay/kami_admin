import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../redux/sidenav/sidenavSlice';
import SideNav from '../../components/SideNav';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { GoogleMap, LoadScript, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CommonComponent/CustomButton';
import { selectToken } from '../../redux/apiResponse/loginApiSlice';
import { Dialog, DialogActions, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
//     googleMapsApiKey: "AIzaSyAp3UpXOj22Gy-w1I7gF2k6I3AYqglEqvw"
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
//         isLoaded?(<GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}  onLoad={onLoad}
//           onUnmount={onUnmount}>
//           {/* You can customize the map as needed */}
//          {
//           hyderabadAreas.map((obj,val)=>{
//             return  <MarkerF key={val} position={obj} />
//           })
//          }
//         </GoogleMap>):(<div>
//           loading...
//           </div>)
//       }

//     </React.Fragment>

//   );
// };

const MapContainer = () => {
  const mapStyles = {
    height: '350px',
    width: '100%',
    borderRadius: '10px',
  };

  const defaultCenter = {
    lat: 17.4399,
    lng: 78.4983,
  };

  const locations = [
    { lat: 17.4489, lng: 78.3907 }, // Hitech City
    { lat: 17.3616, lng: 78.4747 }, // Charminar
    { lat: 17.4432, lng: 78.3497 }, // Gachibowli
    { lat: 17.4156, lng: 78.4347 }, // Banjara Hills
    { lat: 17.4399, lng: 78.4983 }, // Secunderabad (Default Center)
  ];

  return (
    <LoadScript googleMapsApiKey=" AIzaSyAmaZMMaAgoUxEmbWdg1Xv0d2dSibZcZs8">
      <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
        {/* Render markers for each location */}
        {locations.map((location, index) => (
          <MarkerF key={index} position={location} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};


const Organization = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const navigate = useNavigate();
  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const fetchData = async () => {
    try {
      const response = await fetch('http://35.239.192.201:9092/api/property', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setResponseData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleToggle = () => {
    dispatch(toggleSideNav());
  };

  const handleTableRowClick = () => {
    navigate(`/addproperty`);
  };

  const handleClick = (type_id) => {
    console.log("Clicked type_id:", type_id); 
    navigate(`/addpole/${type_id}`);
  };


  const handleEdit = (id) => {
    navigate(`/addproperty/${id}`);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (ids) => {
    console.log("calling the delete");
    console.log(ids);
    const payload = new URLSearchParams({
      id: ids.toString()
    });
    try {
      const response = await fetch(`http://35.239.192.201:9092/api/property`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        },
        body: payload.toString() // Pass array of IDs in the body
      });
      const data = await response.json();

      if (data.msg === "ok") {
        // Delete successful, you may want to update your UI accordingly
        console.log('Properties deleted successfully');
        // You might want to refetch the data after deletion
        fetchData();
      } else {
        console.error('Failed to delete properties');
      }
    } catch (error) {
      console.error('Error deleting properties:', error);
    }
  };

  const handleDeleteClick = (event, id) => {
    event.stopPropagation();
    handleDelete([id]); // Pass an array with single ID
  };


  return (
    <div style={{ display: 'flex' }}>
      <SideNav open={isOpen} handleToggle={handleToggle} />
      <div style={{
        marginLeft: isOpen ? '220px' : '90px',
        padding: '10px', width: '100%', transition: 'margin 0.3s ease'
      }}>
        <div style={{ height: "93vh", backgroundColor: "white", borderRadius: "10px", padding: "10px", marginLeft: "10px", marginRight: "10px", overflow: "auto" }}>
          <Box padding="10px">
            <Box textAlign="right" p={1}>
              <Button onClick={() => handleTableRowClick()} p={0} variant="outlined" size="small"
                sx={{
                  textTransform: "capitalize",
                  width: "150px",
                  padding: "6px",
                  ...commonStyles,
                  '&:hover': {
                    backgroundColor: "#2465e9",
                    color: "white",
                  },
                }}>Add Property</Button>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", }}>

              <Box sx={{ width: { xs: "100%", sm: "100%", md: "49%" } }}>
                <Box display="flex" justifyContent="space-between" my={1} p={2} sx={{ backgroundColor: "#80808017", borderRadius: "5px" }}>
                  <Typography>Property Name</Typography>
                  <Box display="flex" justifyContent="" gap="80px">
                    <Typography>Poles</Typography>
                    <Typography>Actions</Typography>
                  </Box>
                </Box>
                {loading ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '50px',
                      borderRadius: '5px',
                      backgroundColor: '#f0f0f0',
                    }}
                  >
                    <Typography variant="body1" sx={{ color: '#555' }}>Loading...</Typography>
                  </Box>
                ) : (
                  responseData.data && responseData.data.list.map((item, index) => (
                    <>

                      <Box
                        onClick={() => {
                          console.log("Clicked item:", item);
                          handleClick(item['type_id ']); 
                        }} sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: "#f8f7fa",
                          height: "50px",
                          borderRadius: "5px",
                          paddingY: "5px",
                          paddingX: "20px",
                          cursor: "pointer",
                          marginBottom: "10px"
                        }}
                      >

                        <Box display="flex" flexDirection="column">

                          <Typography variant="body-2" style={{ marginRight: '10px', ...commonStyles }}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" component="span" sx={{ fontSize: '13px', ...commonStyles }}>
                            <FmdGoodOutlinedIcon fontSize="13px" sx={{ color: 'blue', verticalAlign: 'middle', marginRight: 0.5 }} />
                            {item.country}, {item.state}
                          </Typography>
                        </Box>
                        <Box display="flex" gap={1} alignItems="center">

                          <Button variant="contained"> {item.id}</Button>
                          <Box display="flex" gap={0} alignItems="center">

                            <IconButton>
                              <img
                                src="assets/icons/editicon.svg"
                                alt=""
                                width="35px"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleEdit(item.id);
                                }}
                              />
                            </IconButton>
                            <IconButton color="secondary" aria-label="delete" onClick={(event) => handleDeleteClick(event, item.id)}>
                              <img src="assets/icons/deleteicon.svg" alt="" width="35px" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </>
                  ))

                )
                }
              </Box>

              <Box sx={{ width: { xs: "100%", sm: "100%", md: '48%' } }}>
                <MapContainer />
              </Box>
            </Box>
          </Box>

        </div>
      </div>
    </div>
  );
};

export default Organization;
