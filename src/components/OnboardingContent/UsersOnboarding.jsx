import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import CustomTextField from '../CommonComponent/CustomTextField';
import CustomDropdown from '../CommonComponent/CustomDropdown';

const commonStyles = {
    fontFamily: "montserrat-regular",
};

const UsersOnboarding = ({ dropdownData }) => {
    const [accessLevel, setAccessLevel] = useState("");

    return (
        <Box sx={{ padding: "20px", marginX: "auto", maxWidth: "1200px", height: '65vh' }}>
            <Grid container spacing={2} alignItems="center">
                {/* First Row */}
                <Grid item xs={12} md={4} sm={4}>
                 <CustomTextField label="User Name"/>
                </Grid>
                <Grid item xs={12} md={4} sm={4}>
                <CustomTextField label="Email Id"/>
                </Grid>
                <Grid item xs={12} md={4} sm={4} sx={{ textAlign:"center" }}>
                    <Button variant="outlined"
                        margin="dense"
                        size="small"
                        sx={{
                            textTransform: "capitalize",
                            width: "180px",
                            padding: "12px",
                            ...commonStyles,
                            '&:hover': {

                                backgroundColor: "#2465e9",
                                color: "white",
                            },
                        }} startIcon={<SendIcon />}  >
                        Send Invite
                    </Button>
                </Grid>

                {/* Second Row */}
                <Grid item xs={12} md={4} sm={6}>                  
                    <CustomDropdown label="Access Level" value={accessLevel} onChange={(e) => setAccessLevel(e.target.value)}>
                    {dropdownData && dropdownData.data && dropdownData.data.roles && dropdownData.data.roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                                {role.name}
                            </MenuItem>
                        ))}
                    </CustomDropdown>
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                 <CustomTextField label="Property Name"/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UsersOnboarding;
