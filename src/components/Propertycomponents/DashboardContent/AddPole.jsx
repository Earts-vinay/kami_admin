import React, { useState ,useEffect} from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import SideNav from '../../SideNav';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../../redux/sidenav/sidenavSlice';
import { selectToken } from '../../../redux/apiResponse/loginApiSlice';
import CustomButton from '../../CommonComponent/CustomButton';
import Map  ,{GeolocateControl,Marker}  from "react-map-gl";
import { GoogleMap, LoadScript, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
    <LoadScript googleMapsApiKey="AIzaSyAp3UpXOj22Gy-w1I7gF2k6I3AYqglEqvw">
      <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
        {/* Render markers for each location */}
        {locations.map((location, index) => (
          <MarkerF key={index} position={location} />
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
  const [property_id, setPropertyId] = useState('2');
  const {id} = useParams();
  const [poleId, setPoleId] = useState(id);
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
  const fetchData = () =>{
    try {
      axios.get(
        `${BaseUrl}pole?property_id=${property_id}`,
       {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${token}`
            }
          }
      ).then((res)=>{
        const {data} = res.data;
      console.log("addpole",res,data)
      if (res.data.code === 200) {
          toast.success(data.msg);
          setResponseData(data);
      } else {
          toast.error(data.msg);
      }
      }).catch((err)=>{})
  
      
  } catch (error) {
      console.error('Error:', error);
  }
  }

  const handleToggle = () => {
    dispatch(toggleSideNav());
  };

  const [deleteDataUpdated, setDeleteDataUpdated] = useState(false)

  const handleDelete = async (ids) => {
    console.log("calling the delete");
    console.log(ids);
    const payload = new URLSearchParams({
      id: ids.toString()
    });
    try {
      const response = await fetch(`http://35.239.192.201:9092/api/pole`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        },
        body: payload.toString() // Pass array of IDs in the body
      });
      const data=await response.json();

      if (data.msg==="ok") {
        // Delete successful, you may want to update your UI accordingly
        console.log('Pole deleted successfully');
        // You might want to refetch the data after deletion
        fetchData();
      } else {
        console.error('Failed to delete pole');
      }
    } catch (error) {
      console.error('Error deleting properties:', error);
    }
  };

  const handleDeleteClick = (event, id) => {
    event.stopPropagation();
    handleDelete([id]); // Pass an array with single ID
  }

useEffect(() => {
  fetchData();
},[token]);

const handleEditPole = (id) => {
  navigate(`/viewpole/${id}`);
};
// const handleEditPole = async () => {
//   navigate(`/viewpole`);

//   try {
//     const response = await axios.put(
//       `${BaseUrl}pole/${poleId}`,
//       {
//         name:'',
//         location_lat:"",
//         location_lng: "",
//       },
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Authorization': `Bearer ${token}`
//         }
//       }
//     );

//     if (response.data.code === 200 && response.data.msg === "ok") {
//       console.log("Success: Pole updated successfully");
//     }
//   } catch (error) {
//     // Handle error scenario
//     console.error('Error:', error);
//   }
// };
  
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
       
         
          style={{ height: '93vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px',overflow:"auto" }}
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
        <TableCell sx={{ ...commonStyles, minWidth: '60px' }}>pole ID</TableCell>
        <TableCell sx={{ ...commonStyles, minWidth: '150px' }}>Lat, Long</TableCell>
        <TableCell sx={{ ...commonStyles, minWidth: '60px' }}>Zone</TableCell>
        <TableCell sx={{ ...commonStyles, minWidth: '130px' }}>Cameras</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {responseData?.list?.length === 0 ? (
        <TableRow>
          <TableCell colSpan={5} align="center" sx={{ ...commonStyles }}>No records found</TableCell>
        </TableRow>
      ) : (
        <>
          {responseData?.list?.map((row, index) => (
            <TableRow key={index}>
              <TableCell sx={{ ...commonStyles, minWidth: '60px' }}>{row.id}</TableCell>
              <TableCell sx={{ ...commonStyles, minWidth: '150px' }}>{row.location_lat}, {row.location_lng}</TableCell>
              <TableCell sx={{ ...commonStyles, minWidth: '60px' }}>-</TableCell>
              <TableCell sx={{ ...commonStyles, minWidth: '130px',alignItems:"center",display:"flex",gap:"5px" }}>
              <Button variant="contained" style={{ backgroundColor: "#007acc", color: 'white', borderRadius: "5px" }}>3</Button>
                   <Box sx={{display:"flex",}}>
                   <IconButton color="primary" aria-label="edit"  onClick={(event) => {
                              event.stopPropagation();
                              handleEditPole(row.id);
                            }} >
                      <img src="assets/icons/editicon.svg" alt="" width="35px "  />
                    </IconButton>
                    <IconButton color="secondary" aria-label="delete"  onClick={(event) => handleDeleteClick(event, row.id)} >
                      <img src="assets/icons/deleteicon.svg" alt="" width="35px"  />
                    </IconButton>
                   </Box>
                   <Dialog open={open} onClose={handleClose}>
         <Typography backgroundColor=" #2465e9" color="white" borderRadius="5px 5px 0px 0px" p={2} sx={commonStyles}>
           Delete User
         </Typography>
         <CloseIcon
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            color: 'white',
            cursor: 'pointer',
            paddingY: '6px',
            paddingX: '10px',
          }}
          onClick={handleClose}
        />
        <DialogContent>
          <Typography width="500px" sx={commonStyles}>Please Confirm to Delete user</Typography>
         
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CustomButton onClick={handleClose}>Cancel</CustomButton>
          <CustomButton onClick={(event) => handleDeleteClick(event, row.id)}>Delete</CustomButton>
        </DialogActions>
      </Dialog>
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
