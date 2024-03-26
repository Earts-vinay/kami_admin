import React, { useEffect, useState } from 'react'; // Added useState
import axios from 'axios'; // Added axios import
import SideNav from '../../../SideNav';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../../../redux/sidenav/sidenavSlice';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import CustomButton from '../../../CommonComponent/CustomButton';
import HeaderLayout from '../../../CommonComponent/HeaderLayout';
import { selectResponseData } from '../../../../redux/apiResponse/poleSlice';
import { selectToken } from '../../../../redux/apiResponse/loginApiSlice';
import { HashLoader } from 'react-spinners';

const commonStyles = {
    fontFamily: "montserrat-regular",
};

const BaseUrl = process.env.REACT_APP_API_URL


const PairDevice = () => {
    const navigate = useNavigate();
    const isOpen = useSelector(selectIsSideNavOpen);
    const dispatch = useDispatch();
    const [deviceList, setDeviceList] = useState([]);
    const [responseData, setResponseData] = useState(null); // State to store the response data
    const [isLoading, setIsLoading] = useState(true);

    const responsePoleData = useSelector(selectResponseData);
    console.log(responsePoleData);
    const token = useSelector(selectToken);

    useEffect(() => {
        console.log('Effect triggered');
        const fetchData = async (poleId, propertyId) => {
            console.log(poleId, propertyId);
            try {
                const params = new URLSearchParams({
                    search: "",
                    property_id: propertyId,
                    pole_id: poleId
                });

                const response = await axios.get(`${BaseUrl}device?${params}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log('API Response:', response.data);
                // setDeviceList(prevDeviceList => [...prevDeviceList, ...response.data]);
                setResponseData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        if (responsePoleData && responsePoleData.list && responsePoleData.list.length > 0) {
            setIsLoading(true); 
            responsePoleData.list.forEach(item => {
                const { id: poleId, property_id: propertyId } = item;
                console.log('Fetching data for poleId:', poleId, 'propertyId:', propertyId);
                fetchData(poleId, propertyId);
            });
        } else {
            console.log('No data found in responsePoleData or list is empty');
            setIsLoading(false); 
        }
    }, [responsePoleData, token]);


    const handleToggle = () => {
        dispatch(toggleSideNav());
    };

    const handlePair = (deviceId) => {
        navigate(`/devicesparing`, { state: { id: deviceId } });
    };
    

    const extractIpAddressAndNetworkType = (streamUrl) => {
        if (!streamUrl) {
            return { ipAddress: '', networkType: 'Unknown' };
        }

        const ipAddressAndPort = streamUrl.split('@')[1];
        if (!ipAddressAndPort) {
            return { ipAddress: '', networkType: 'Unknown' };
        }

        const ipAddress = ipAddressAndPort.split(':')[0];
        const networkType = streamUrl.startsWith('rtsp') ? 'RTSP' : 'Unknown';
        return { ipAddress, networkType };
    };


    // Sample data array
    const devices = [
        { id: 1, cameraView: 'assets/images/car1.png', ipAddress: '192.168.1.1', networkType: '4G', status: 'Authenticated', paired: false },
        { id: 2, cameraView: 'assets/images/car1.png', ipAddress: '192.168.1.2', networkType: 'WiFi', status: 'Not Authenticated', paired: true },
        // Add more devices as needed
    ];

    const isPaired = (device) => {
        const matchingPole = responsePoleData.list.find(pole => pole.id === device.pole_id);
        return matchingPole ? true : false;
    };
    

    return (
        <>
            <HeaderLayout>
                <Box padding="15px">
                    <Typography varient="h6" sx={commonStyles} >Discover Devices to pair</Typography>
                    <Typography varient="body-2" fontSize="12px" sx={commonStyles}>Ensure that you are connected to the same network that the device is to be paired in</Typography>
                </Box>

                {isLoading ? (
                     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
                     <HashLoader color="#2465e9" size={50} /> {/* Adjust color and size as needed */}
                   </div>
                ) : (
                <TableContainer >
                    <Table padding="15px">
                        <TableHead>
                            <TableRow sx={{ background: 'rgba(211, 211, 211, 0.3)', borderRadius: "5px" }}>
                                <TableCell sx={commonStyles}>Camera View</TableCell>
                                <TableCell sx={commonStyles}>IP Address</TableCell>
                                <TableCell sx={commonStyles}>Network Type</TableCell>
                                <TableCell sx={commonStyles}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {responseData && responseData.data.list.map(device => (
                                <TableRow key={device.id}>
                                    <TableCell width="20%" sx={{ paddingY: "10px" }}>
                                        <img src={device.screen_capture} alt="" style={{ width: "150px", height: '80px', borderRadius: "5px" }} />
                                    </TableCell>
                                    <TableCell sx={commonStyles}>{extractIpAddressAndNetworkType(device.stream_url).ipAddress}</TableCell>
                                    <TableCell sx={commonStyles}>{extractIpAddressAndNetworkType(device.stream_url).networkType}</TableCell>
                                    <TableCell>
                                        {isPaired(device) ? (
                                            <CustomButton disabled>Paired</CustomButton>
                                        ) : (
                                            <CustomButton onClick={() => handlePair(device.id)}>Pair Device</CustomButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
                )}
            </HeaderLayout>
        </>
    )
}

export default PairDevice;
