import { Box, Button, Grid, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import CustomTextField from '../CommonComponent/CustomTextField';
import CustomDropdown from '../CommonComponent/CustomDropdown';
import { selectToken } from '../../redux/apiResponse/loginApiSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
const BaseUrl = process.env.REACT_APP_API_URL
const UsersOnboarding = ({ dropdownData }) => {
    console.log(dropdownData);
    const [accessLevel, setAccessLevel] = useState("");
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [propertyName, setPropertyName] = useState("");
    const token = useSelector(selectToken);

    // console.log(accessLevel, userName,emailId,propertyName );

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleEmailIdChange = (event) => {
        setEmail(event.target.value);
    };

    const handleAccessLevelChange = (event) => {
        setAccessLevel(event.target.value);
    };

    const handlePropertyNameChange = (event) => {
        setPropertyName(event.target.value);
    };


    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                `${BaseUrl}user/invite`,
                {
                    username: userName,
                    email: email,
                    role_id: parseInt(accessLevel), // Convert to integer
                    property_id: parseInt(propertyName)
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const responseData = response.data;
            // console.log('Response:', responseData);
            if (responseData.code === 200) {
                toast.success(responseData.msg);
            } else {
                toast.error(responseData.msg);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <Box sx={{ padding: "20px", marginX: "auto", maxWidth: "1200px", height: '65vh' }}>
            <Grid container spacing={2} alignItems="center">
                {/* First Row */}
                <Grid item xs={12} md={4} sm={4}>
                    <CustomTextField label="User Name" value={userName} onChange={handleUserNameChange} />
                </Grid>
                <Grid item xs={12} md={4} sm={4}>
                    <CustomTextField label="Email Id" value={email} onChange={handleEmailIdChange} />
                </Grid>
                <Grid item xs={12} md={4} sm={4} sx={{ textAlign: "center" }}>
                    <Button
                        variant="outlined"
                        margin="dense"
                        size="small"
                        sx={{
                            textTransform: "capitalize",
                            width: "180px",
                            padding: "12px",
                            '&:hover': {
                                backgroundColor: "#2465e9",
                                color: "white",
                            },
                        }}
                        startIcon={<SendIcon />}
                        onClick={handleSubmit}
                    >
                        Send Invite
                    </Button>
                </Grid>

                {/* Second Row */}
                <Grid item xs={12} md={4} sm={6}>
                    <CustomDropdown
                        label="Access Level"
                        value={accessLevel}
                        onChange={handleAccessLevelChange}
                    >
                        {dropdownData && dropdownData.data && dropdownData.data.roles && dropdownData.data.roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                                {role.name}
                            </MenuItem>
                        ))}
                    </CustomDropdown>
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                    <CustomDropdown
                        label="Property Type"
                        value={propertyName}
                        onChange={handlePropertyNameChange}
                    >
                        {dropdownData && dropdownData.data && dropdownData.data.property_types && dropdownData.data.property_types.map((property) => (
                            <MenuItem key={property.id} value={property.id}>
                                {property.name}
                            </MenuItem>
                        ))}
                    </CustomDropdown>                </Grid>
            </Grid>
        </Box>
    );
};

export default UsersOnboarding;
