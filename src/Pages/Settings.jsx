import React,{useState} from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SideNav from '../components/SideNav';
import { useNavigate } from 'react-router-dom';
const Settings = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen(!open);
  };
  const handleTableRowClick = () => {
    navigate(`/settingsinside`);
  };

 
  // Assuming data is an array of objects with the required properties
  const data= [
    { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM',state:"virginia",country:"USA" },
    { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM',state:"virginia",country:"USA" },
    { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM',state:"virginia",country:"USA" },
    { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM',state:"virginia",country:"USA" },
    { name: 'Western Super Market', alert: 'Active', detection: 'Inactive', status: 'Online', notification: 'Enabled', time: '12:30 PM',state:"virginia",country:"USA" },
]
  
  return (
    <>
        <div  style={{ display: 'flex' }}> 
       <SideNav open={open} handleToggle={handleToggle} />
      <div style={{ marginLeft: open ? '250px' : '70px', padding: '10px', width: '100%', transition: 'margin 0.3s ease' }}>
      <Box style={{ height: '93vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginLeft: '10px', marginRight: '10px' }}>
        <Box>
        <Box sx={{paddingTop:"10px", textAlign:"end"}}>
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
        </Box>
        <Box>
          {/* Implement the Material-UI table with dynamic data */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Property Name</TableCell>
                  <TableCell>Raise Alert</TableCell>
                  <TableCell>Vehicle Detection</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Notification</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index} onClick={() => handleTableRowClick()} sx={{cursor:"pointer"}}>
                    <TableCell  >{item.name} <Typography varient="body-2">{item.state} {item.country}</Typography></TableCell>
                    <TableCell>{item.alert}</TableCell>
                    <TableCell>{item.detection}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.notification}</TableCell>
                    <TableCell>{item.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      </div>
      </div>
    </>
  );
};

export default Settings;
