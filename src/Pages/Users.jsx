import React, { useState } from 'react';
import { Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import SideNav from '../components/SideNav';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../redux/sidenav/sidenavSlice';

const Users = () => {
  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleSideNav());
  };

  // Sample user data array
  const usersData = [
    { id: 1, name: 'John Doe', property: 'Some Property', accessLevel: 'Admin' },
    { id: 2, name: 'John Doe', property: 'Some Property', accessLevel: 'Admin' },
    { id: 3, name: 'John Doe', property: 'Some Property', accessLevel: 'Admin' },
    { id: 4, name: 'John Doe', property: 'Some Property', accessLevel: 'Admin' },
    { id: 5, name: 'John Doe', property: 'Some Property', accessLevel: 'Admin' },
    { id: 6, name: 'John Doe', property: 'Some Property', accessLevel: 'Admin' },
    { id: 7, name: 'John Doe', property: 'Some Property', accessLevel: 'Admin' },
    // Add more user objects as needed
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex' }}>
      <SideNav open={isOpen} handleToggle={handleToggle} />
      <div style={{ 
        marginLeft: isOpen ? '220px' : '90px',
         padding: '10px', width: '100%', transition: 'margin 0.3s ease' }}>
        <Box style={{ height: '93vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginLeft: '10px', marginRight: '10px' }}>
          <Box sx={{ paddingTop: "10px", textAlign: "end" }}>
            <TextField
              label="Search"
              fontSize="14px"
              variant="outlined"
              style={{ marginBottom: '20px', height: '40px', border: 'solid 1px #61A0E9', outline: 'none' }}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: 'linear-gradient(119deg, #ebeffa 2%, #e8ebfd 30%, #f0ecf9 51%, #efeefb 70%, #eef7ff 100%)',
                borderRadius: '5px',
                height: '40px' // Set the height
              }}
            />
            <Button variant="outlined" color="primary" style={{ marginLeft: '10px', height: '40px', border: 'solid 2px #61A0E9' }}>
              Add User
            </Button>
          </Box>


          <Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ "& .css-15wwp11-MuiTableHead-root": { background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4)) !important' } }}>


                <TableRow sx={{ background: 'rgba(211, 211, 211, 0.3)' }}>
                    <TableCell></TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px' }}>User Names</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px' }}>Property</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px' }}>Access Level</TableCell>
                    <TableCell  sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell width="20px"><img src="assets/icons/girlicon.svg" alt="" width="40px" /></TableCell>
                      <TableCell sx={{}}>

                        {user.name}
                      </TableCell>
                      <TableCell>{user.property}</TableCell>
                      <TableCell>{user.accessLevel}</TableCell>
                      <TableCell>
                        <IconButton color="primary" aria-label="edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton color="secondary" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default Users;
