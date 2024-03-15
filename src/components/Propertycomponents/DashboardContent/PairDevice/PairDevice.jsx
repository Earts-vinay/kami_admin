import React from 'react';
import SideNav from '../../../SideNav';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../../../redux/sidenav/sidenavSlice';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const PairDevice = () => {
    const navigate = useNavigate();
    const isOpen = useSelector(selectIsSideNavOpen);
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleSideNav());
    };

    const handlepair = () => {
        navigate(`/devicesparing`);
    };

    // Sample data array
    const devices = [
        { id: 1, cameraView: 'assets/images/car1.png', ipAddress: '192.168.1.1', networkType: '4G', status: 'Authenticated', paired: false },
        { id: 2, cameraView: 'assets/images/car1.png', ipAddress: '192.168.1.2', networkType: 'WiFi', status: 'Not Authenticated', paired: true },
        // Add more devices as needed
    ];

    return (
        <>
            <div style={{ display: 'flex' }}>
                <SideNav open={isOpen} handleToggle={handleToggle} />
                <div style={{
                    marginLeft: isOpen ? '220px' : '90px',
                    padding: '10px', width: '100%', transition: 'margin 0.3s ease'
                }}>
                    <Box style={{ height: '90vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginLeft: '10px', marginRight: '10px' }}>
                        <Box padding="15px">
                            <Typography varient="h6"  >Discover Devices to pair</Typography>
                            <Typography varient="body-2" fontSize="12px">Ensure that you are connected to same network that the device is to parried In</Typography>
                        </Box>

                        <TableContainer >
                            <Table padding="15px">
                                <TableHead>
                                    <TableRow sx={{ background: 'rgba(211, 211, 211, 0.3)', borderRadius: "5px" }}>
                                        <TableCell>Camera View</TableCell>
                                        <TableCell>IP Address</TableCell>
                                        <TableCell>Network Type</TableCell>
                                        
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {devices.map(device => (
                                        <TableRow key={device.id} >
                                            <TableCell width="20%" sx={{ paddingY: "10px" }}>
                                                <img src={devices.image} alt={""} style={{ width:"150px", height: '80px', borderRadius: "5px" }} />
                                            </TableCell>
                                            <TableCell>{device.ipAddress}</TableCell>
                                            <TableCell>{device.networkType}</TableCell>
                                           
                                            <TableCell>
                                                <Button disabled={device.paired} variant="outlined" onClick={() => handlepair()}>Pair Device</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>
            </div>
        </>
    )
}

export default PairDevice;
