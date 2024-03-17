import React from 'react';
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

const MapContainer = () => {
  const mapStyles = {
    height: '350px',
    width: '100%',
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

const Dashboard = () => {
  const navigate = useNavigate();
  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();

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
          {/* Add Property Button */}
          <Box textAlign="right" p={1}>
            <CustomButton onClick={() => handleTableRowClick()}>Add Property</CustomButton>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between",gap:"10px" }}>
            {/* Left Side */}
            <Box sx={{ width: { xs: "100%", sm: "100%",md:"48%" } }}>
              <Box onClick={() => handleClick()} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f8f7fa", width: "90%", height: "50px", borderRadius: "5px", paddingY: "5px", paddingX: "20px", cursor: "pointer" }}>
                <Box display="flex" flexDirection="column">
                  <Typography variant="body-2" style={{ marginRight: '10px' }}>
                    WallMart Supermarket
                  </Typography>
                  <Typography variant="body2" component="span" sx={{ fontSize: '13px' }}>
                    <FmdGoodOutlinedIcon fontSize="13px" sx={{ color: 'blue', verticalAlign: 'middle', marginRight: 0.5 }} />
                    Virginia, USA
                  </Typography>
                </Box>
                {/* Background Color */}
                <Box display="flex" gap={2}>
                  <Button variant="contained"> 4</Button>
                  <img src="assets/icons/editicon.svg" alt="" width="35px" />
                </Box>
              </Box>
            </Box>

            {/* Map */}
            <Box sx={{ width: { xs: "100%", sm: "100%",md: '48%' } }}>
              <MapContainer />
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  </div>

  );
};

export default Dashboard;
