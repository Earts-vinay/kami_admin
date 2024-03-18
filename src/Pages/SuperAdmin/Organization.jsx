import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../redux/sidenav/sidenavSlice';
import SideNav from '../../components/SideNav';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CommonComponent/CustomButton';
import { selectToken } from '../../redux/apiResponse/loginApiSlice';

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
    lat: 37.7749, // Default latitude
    lng: -122.4194, // Default longitude
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCRQBtQkOyqMNr0YheCgm9LVbvjRtnbo6Y">
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
        {/* You can customize the map as needed */}
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

const Organization = () => {
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const navigate = useNavigate();
  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
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

    fetchData();
  }, [token]); 

  const handleToggle = () => {
    dispatch(toggleSideNav());
  };

  const handleTableRowClick = () => {
    navigate(`/addproperty`);
  };

  const handleClick = () => {
    navigate(`/addpole`);
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideNav open={isOpen} handleToggle={handleToggle} />
      <div style={{
        marginLeft: isOpen ? '220px' : '90px',
        padding: '10px', width: '100%', transition: 'margin 0.3s ease'
      }}>
        <div style={{ height: "93vh", backgroundColor: "white", borderRadius: "10px", padding: "10px", marginLeft: "10px", marginRight: "10px" }}>
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
                    <Box key={index} onClick={() => handleClick()} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f8f7fa", height: "50px", borderRadius: "5px", paddingY: "5px", paddingX: "20px", cursor: "pointer", marginBottom: "10px" }}>
                      <Box display="flex" flexDirection="column">
                        <Typography variant="body-2" style={{ marginRight: '10px', ...commonStyles }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" component="span" sx={{ fontSize: '13px', ...commonStyles }}>
                          <FmdGoodOutlinedIcon fontSize="13px" sx={{ color: 'blue', verticalAlign: 'middle', marginRight: 0.5 }} />
                          {item.country}, {item.state}
                        </Typography>
                      </Box>
                      <Box display="flex" gap={2}>
                        <Button variant="contained"> {item.id}</Button> {/* Item ID */}
                        <img src="assets/icons/editicon.svg" alt="" width="35px" />
                      </Box>
                    </Box>
                  ))
                )}
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
