import React, { useState, useEffect } from 'react';
import { Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, InputAdornment, Popover, FormControlLabel, Checkbox, Typography, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import SideNav from '../../components/SideNav';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../redux/sidenav/sidenavSlice';
import FilterListIcon from '@mui/icons-material/FilterList';
import { selectToken } from '../../redux/apiResponse/loginApiSlice';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CommonComponent/CustomButton';

const commonStyles = {
  fontFamily: "montserrat-regular",
};

const Users = () => {
  const isOpen = useSelector(selectIsSideNavOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    dispatch(toggleSideNav());
  };

  const [anchorEl, setAnchorEl] = useState(null); // State for popover anchor element
  const [selectedAccessLevels, setSelectedAccessLevels] = useState([]); // State for selected access levels
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const token = useSelector(selectToken);

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddUser = () => {
    navigate(`/edituser`);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://35.239.192.201:9092/api/user/list', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.code === 200) {
        setUsersData(data.data.list);
      } else {
        console.error('Error fetching data:', data.msg);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Update loading state after fetching data
    }
  };

  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const handleAccessLevelChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedAccessLevels((prevLevels) => [...prevLevels, value]);
    } else {
      setSelectedAccessLevels((prevLevels) => prevLevels.filter((level) => level !== value));
    }
  };

  const isPopoverOpen = Boolean(anchorEl);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div style={{ display: 'flex' }}>
      <SideNav open={isOpen} handleToggle={handleToggle} />
      <div style={{
        marginLeft: isOpen ? '220px' : '90px',
        padding: '10px', width: '100%', transition: 'margin 0.3s ease'
      }}>
        <Box style={{ height: '93vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginLeft: '10px', marginRight: '10px', overflow: "auto" }}>
          <Box sx={{ display:"flex",justifyContent:"end",alignItems:"center",gap:'10px',padding:"10px"}}>
            <TextField
              label="Search"
              fontSize="14px"
              variant="outlined"
              style={{  border: 'solid 1px #61A0E9', outline: 'none' }}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CustomButton onClick={handleAddUser}>Add User</CustomButton>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ "& .css-15wwp11-MuiTableHead-root": { background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4)) !important' } }}>
                <TableRow sx={{ background: 'rgba(211, 211, 211, 0.3)' }}>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px',...commonStyles }}>User Names</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px',...commonStyles }}>Property</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px',...commonStyles, display: "flex", alignItems: "center", gap: "5px" }} >
                    <FilterListIcon />
                    <Typography onClick={openPopover} > Access Level</Typography>
                    <Popover
                      open={isPopoverOpen}
                      anchorEl={anchorEl}
                      onClose={closePopover}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                    >
                      <Box p={2} display="flex" flexDirection="column">
                        <FormControlLabel
                          control={<Checkbox checked={selectedAccessLevels.includes('Super Admin')} onChange={handleAccessLevelChange} value="Super Admin" />}
                          label="Super Admin"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={selectedAccessLevels.includes('Property Admin')} onChange={handleAccessLevelChange} value="Property Admin" />}
                          label="Property Admin"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={selectedAccessLevels.includes('Property Manager')} onChange={handleAccessLevelChange} value="Property Manager" />}
                          label="Property Manager"
                        />
                      </Box>
                    </Popover></TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#A9A8AA', fontSize: '15px' }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  usersData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell width="20px"><img src="assets/icons/girlicon.svg" alt="" width="40px" /></TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>
                        {user.propertys.length > 0 ? (
                          user.propertys.map((property, index) => (
                            <span key={index}>
                              {property.name} {/* Assuming 'name' is the property you want to display */}
                              {index !== user.propertys.length - 1 && ', '}
                            </span>
                          ))
                        ) : (
                          'No properties'
                        )}
                      </TableCell>
                      <TableCell>{user.role_name}</TableCell>
                      <TableCell>
                        <IconButton color="primary" aria-label="edit">
                          <img src="assets/icons/editicon.svg" alt="" width="35px" />
                        </IconButton>
                        <IconButton color="secondary" aria-label="delete">
                          <img src="assets/icons/deleteicon.svg" alt="" width="35px" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </div>
  );
}

export default Users;
