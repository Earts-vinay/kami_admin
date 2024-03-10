import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  InputAdornment,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Devices = () => {
  // Example data array
  const data = [
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10 },
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10 },
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10 },
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10 },
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10 },
    // Add more data objects as needed
  ];

  return (
    <>
    

   <div style={{height:"93vh",backgroundColor:"white",borderRadius:"10px",padding:"10px",marginLeft:"10px",marginRight:"10px" }}>
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
   <Box>
   <TableContainer component={Paper} marginTop="10px">
      <Table>
       
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.propertyName}</TableCell>
              <TableCell>Poles Installed : {row.pollsInstalled}</TableCell>
              <TableCell>Camera's Installed : {row.camerasInstalled}</TableCell>
              <TableCell>Active Camera's : {row.activeCameras}</TableCell>
              <TableCell> Inactive Cameras : {row.inactiveCameras}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </Box>
   
   </div>
   </>
  );
}

export default Devices;
