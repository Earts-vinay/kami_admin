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
import { setSelectedProperty } from '../../redux/propertySlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import HeaderLayout from '../../components/CommonComponent/HeaderLayout';

const commonStyles = {
  fontFamily: "montserrat-regular",
};

const BaseUrl = process.env.REACT_APP_API_URL


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

  const handleClick = (property) => {
    console.log("Clicked property:", property);
    dispatch(setSelectedProperty(property));
    navigate(`/addpole`);
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
        toast.success('Property deleted successfully'); // Show toast message
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

  const [poleLengths, setPoleLengths] = useState({});

  const fetchPolelengthDataById = async (id) => {
    try {
      const url = `${BaseUrl}pole?property_id=${id}`;
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      const res = await axios.get(url, { headers });
      const { data } = res.data;
      if (res.data.code === 200) {
        toast.success(data.msg);
        setPoleLengths(prevState => ({ ...prevState, [id]: data.list.length }));
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    responseData.data && responseData.data.list.forEach(item => {
      fetchPolelengthDataById(item.id);
    });
  }, [responseData.data, token]);

  return (
    <HeaderLayout>
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
                          handleClick(item);
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

                          {/* <Button variant="contained"> {item.id}</Button> */}
                          <Button variant="contained">
                            {poleLengths[item.id] ?? 0}
                          </Button>

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
</HeaderLayout>
 
  );
};

export default Organization;
