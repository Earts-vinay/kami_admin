import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  Box,
  Typography,
  TextField,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../redux/sidenav/sidenavSlice';
import SideNav from '../../components/SideNav';
import { useNavigate } from 'react-router-dom';
import { selectToken } from '../../redux/apiResponse/loginApiSlice';

const commonStyles = {
  fontFamily: "montserrat-regular",
};
const Devices = () => {
  const navigate = useNavigate();
  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  // console.log(data);
  const token = useSelector(selectToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/property/stat`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result.data.list);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleToggle = () => {
    dispatch(toggleSideNav());
  };

  const handleTableRowClick = () => {
    navigate(`/devicesinside`);
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideNav open={isOpen} handleToggle={handleToggle} />
      <div style={{
        marginLeft: isOpen ? '220px' : '90px',
        padding: '10px', width: '100%', transition: 'margin 0.3s ease'
      }}>
        <div style={{ height: "93vh", backgroundColor: "white", borderRadius: "10px", padding: "10px", marginLeft: "10px", overflow: 'auto' }}>
          <Box sx={{ paddingTop: "10px", textAlign: "end" }}>
            <TextField
              label="Search"
              fontSize="14px"
              variant="outlined"
              style={{ marginBottom: '20px', border: 'solid 1px #2465e9', }}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ backgroundColor: 'linear-gradient(119deg, #ebeffa 2%, #e8ebfd 30%, #f0ecf9 51%, #efeefb 70%, #eef7ff 100%)', border: 'none', borderRadius: '5px' }}
            />
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'rgba(211, 211, 211, 0.3)' }} >
                  <TableCell>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px',...commonStyles }}>Property Name</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px',...commonStyles }}>Polls Installed</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px',...commonStyles }}>Cameras Installed</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px',...commonStyles }}>Active Cameras</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px',...commonStyles }}>Inactive Cameras</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data && data.map((row, index) => (
                  <TableRow key={index} onClick={() => handleTableRowClick()}>
                    <TableCell>
                    <Typography variant="body1" sx={{ ...commonStyles, fontSize: 'small' }}>
                        {row.property_name}
                      </Typography>
                      <Typography variant="body2" component="span" sx={{ fontSize: '13px',...commonStyles }}>
                        <FmdGoodOutlinedIcon fontSize="13px" sx={{ color: 'blue', verticalAlign: 'middle', marginRight: 0.5 }} />
                        {/* Replace with actual state and country values if available in the API response */}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">{row.raise_alert}</TableCell>
                    <TableCell align="center">{row.camera_num}</TableCell>
                    <TableCell align="center">{row.activate_camera_num}</TableCell>
                    <TableCell align="center">{row.inactivate_camera_num}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Devices;
