// import React, { useState } from 'react';
// import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment, Typography } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import SideNav from '../../components/SideNav';
// import { useNavigate } from 'react-router-dom';
// import PlaceIcon from '@mui/icons-material/Place';
// import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectIsSideNavOpen, toggleSideNav } from '../../redux/sidenav/sidenavSlice';
// import CustomSearch from '../../components/CommonComponent/CustomSearch';

// const commonStyles = {
//   fontFamily: "montserrat-regular",
// };

// const Settings = () => {
//   const navigate = useNavigate();

//   const isOpen = useSelector(selectIsSideNavOpen);
//   const dispatch = useDispatch();

//   const handleToggle = () => {
//     dispatch(toggleSideNav());
//   };

//   const handleTableRowClick = () => {
//     navigate(`/settingsinside`);
//   };

//   const data = [
//     { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM', state: "virginia", country: "USA" },
//     { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM', state: "virginia", country: "USA" },
//     { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM', state: "virginia", country: "USA" },
//     { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM', state: "virginia", country: "USA" },
//     { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM', state: "virginia", country: "USA" },
//     { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM', state: "virginia", country: "USA" },
//     { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM', state: "virginia", country: "USA" },
//   ]  // Assuming data is an array of objects with the required properties

//   return (
//     <>
//       <div style={{ display: 'flex' }}>
//         <SideNav open={isOpen} handleToggle={handleToggle} />
//         <div style={{
//            marginLeft: isOpen ? '220px' : '90px',
//             padding: '10px', width: '100%', transition: 'margin 0.3s ease' }}>
//           <Box style={{ height: '93vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginLeft: '10px', marginRight: '10px' }}>
//             <Box>
//               <Box sx={{ paddingY: "5px", textAlign: "end" }}>
//               <CustomSearch label="Search" customSx={{ width: '500px',size:"small" }}/>
//               </Box>
//             </Box>
//             <Box>
//               {/* Implement the Material-UI table with dynamic data */}
//               <TableContainer component={Paper}>
//                 <Table>
//                   <TableHead>
//                     <TableRow sx={{ background: 'rgba(211, 211, 211, 0.3)' }}>
//                       <TableCell sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px',...commonStyles }}>Property Name</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px',...commonStyles }}>Raise Alert</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px',...commonStyles }}>Vehicle Detection</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px',...commonStyles }}>Status</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px',...commonStyles }}>Notification</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px',...commonStyles }}>Time</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {data.map((item, index) => (
//                       <TableRow key={index} onClick={() => handleTableRowClick()} sx={{ cursor: "pointer" }}>
//                         <TableCell>
//                           <Typography variant="body1" sx={commonStyles}>
//                             {item.name}
//                           </Typography>
//                           <Typography variant="body2" component="span" sx={{ fontSize: '13px',...commonStyles }}>
//                             <FmdGoodOutlinedIcon fontSize="13px" sx={{ color: 'blue', verticalAlign: 'middle', marginRight: 0.5 }} />
//                             {item.state}, {item.country}
//                           </Typography>
//                         </TableCell>
//                         <TableCell sx={commonStyles}>{item.alert}</TableCell>
//                         <TableCell sx={commonStyles}>{item.detection}</TableCell>
//                         <TableCell sx={commonStyles}>{item.status}</TableCell>
//                         <TableCell sx={commonStyles}>{item.notification}</TableCell>
//                         <TableCell sx={commonStyles}>{item.time}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>
//           </Box>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Settings;

import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import CustomSearch from "../../components/CommonComponent/CustomSearch";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/apiResponse/loginApiSlice";
import { useNavigate } from "react-router";
import {
  selectIsSideNavOpen,
  toggleSideNav,
} from "../../redux/sidenav/sidenavSlice";
import SideNav from "../../components/SideNav";
import HeaderLayout from "../../components/CommonComponent/HeaderLayout";
import { HashLoader } from "react-spinners";

const commonStyles = {
  fontFamily: "montserrat-regular",
};

const BaseUrl = process.env.REACT_APP_API_URL

const Settings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(data);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleSideNav());
  };

  const handleTableRowClick = (propertyId) => {
    console.log(propertyId);
    navigate(`/settingsinside/${propertyId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}property/settings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.data.list);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, [token]);

  console.log("settings", data);
  return (
    <>
      <HeaderLayout>
        <Box>
          <Box sx={{ paddingY: "5px", textAlign: "end" }}>
            <CustomSearch
              label="Search"
              customSx={{ width: "500px", size: "small" }}
            />
          </Box>
        </Box>
        <Box>
        {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px",height:"60vh" }}>
          <HashLoader size={50} color="#2465e9" loading={loading} />
        </Box>
      ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "rgba(211, 211, 211, 0.3)" }}>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#A9A8AA",
                      ...commonStyles,
                    }}
                  >
                    Property Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#A9A8AA",
                      ...commonStyles,
                    }}
                  >
                    Raise Alert
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#A9A8AA",
                      ...commonStyles,
                    }}
                  >
                    Vehicle Detection
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#A9A8AA",
                      ...commonStyles,
                    }}
                  >
                    Notification
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#A9A8AA",
                      ...commonStyles,
                    }}
                  >
                    Time
                  </TableCell>
                  {/* Add more table headers as needed */}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow
                    key={index}
                    onClick={() => {
                      handleTableRowClick(item.id);
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      <Typography variant="body1" sx={commonStyles}>
                        {item.property_name}
                      </Typography>
                      {/* Additional data cells */}
                    </TableCell>
                    <TableCell sx={commonStyles}>{item.raise_alert}</TableCell>
                    <TableCell sx={commonStyles}>
                      {item.vehicle_detect}
                    </TableCell>
                    <TableCell sx={commonStyles}>
                      {item.notice_weekday}
                    </TableCell>
                    <TableCell sx={commonStyles}>
                      {item.notic_datetime}
                    </TableCell>
                    {/* Add more table cells as needed */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      )}
        </Box>
      </HeaderLayout>
    </>
  );
};

export default Settings;
