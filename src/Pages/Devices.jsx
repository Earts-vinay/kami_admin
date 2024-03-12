// import React from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Box,
//   InputAdornment,
//   TextField,
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// const Devices = () => {
//   // Example data array
//   const data = [
//     { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10 },
//     { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10 },
//     { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10 },
//     { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10 },
//     { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10 },
//     // Add more data objects as needed
//   ];

//   return (
//     <>
    

//    <div style={{height:"93vh",backgroundColor:"white",borderRadius:"10px",padding:"10px",marginLeft:"10px",marginRight:"10px" }}>
//    <Box sx={{paddingTop:"10px", textAlign:"end"}}>
//    <TextField
              
//               label="Search"
//               fontSize="14px"
//               variant="outlined"
//               style={{ marginBottom: '20px', border: 'solid 1px #2465e9', }}
//               size="small"
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{ backgroundColor: 'linear-gradient(119deg, #ebeffa 2%, #e8ebfd 30%, #f0ecf9 51%, #efeefb 70%, #eef7ff 100%)', border: 'none', borderRadius: '5px' }}
//             />
//    </Box>
//    <Box>
//    <TableContainer component={Paper} marginTop="10px">
//       <Table>
       
//         <TableBody>
//           {data.map((row, index) => (
//             <TableRow key={index}>
//               <TableCell>{row.propertyName}</TableCell>
//               <TableCell>Poles Installed : {row.pollsInstalled}</TableCell>
//               <TableCell>Camera's Installed : {row.camerasInstalled}</TableCell>
//               <TableCell>Active Camera's : {row.activeCameras}</TableCell>
//               <TableCell> Inactive Cameras : {row.inactiveCameras}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//    </Box>
   
//    </div>
//    </>
//   );
// }

// export default Devices;


import React,{useState} from 'react';
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
  TextField,
} from '@mui/material';
import SideNav from '../components/SideNav';
import SearchIcon from '@mui/icons-material/Search';

const Devices = () => {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  }
  // Example data array
  const data = [
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10 },
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10 },
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10 },
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10 },
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10 },
    { propertyName: 'WallMart Supermarket', pollsInstalled: 200, camerasInstalled: 100, activeCameras: 90, inactiveCameras: 10 },
    // Add more data objects as needed
  ];

  return (
    <div  style={{ display: 'flex' }}> 
    <SideNav open={open} handleToggle={handleToggle} />
   <div style={{ marginLeft: open ? '250px' : '70px', padding: '10px', width: '100%', transition: 'margin 0.3s ease' }}>
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

   <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Property Name</TableCell>
            <TableCell>Polls Installed</TableCell>
            <TableCell>Cameras Installed</TableCell>
            <TableCell>Active Cameras</TableCell>
            <TableCell>Inactive Cameras</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.propertyName}</TableCell>
              <TableCell>{row.pollsInstalled}</TableCell>
              <TableCell>{row.camerasInstalled}</TableCell>
              <TableCell>{row.activeCameras}</TableCell>
              <TableCell>{row.inactiveCameras}</TableCell>
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
