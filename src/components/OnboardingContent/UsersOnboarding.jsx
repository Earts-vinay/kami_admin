import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

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
                    <Typography variant="body2" sx={commonStyles} >User Name</Typography>
                    <TextField label="John Doe" fullWidth
                        InputProps={{
                            sx: { height: '50px' }
                        }}
                        margin="dense" />
                </Grid>

                <Grid item xs={12} md={4} sm={4}>
                    <Typography variant="body2" sx={commonStyles}>Email Id</Typography>
                    <TextField label="JohnDoe@gmail.com" fullWidth
                        InputProps={{
                            sx: { height: '50px' }
                        }}
                        margin="dense" />
                </Grid>

                <Grid item xs={12} md={4} sm={4} sx={{ marginTop: "20px",textAlign:"center" }}>
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
                    <Typography variant="body2" sx={commonStyles}>Access Level</Typography>
                    <TextField
                        label="Dropdown"
                        select
                        fullWidth
                        margin="dense"
                        InputProps={{
                            sx: { height: '50px' }
                        }}
                        value={accessLevel}
                        onChange={(e) => setAccessLevel(e.target.value)}
                    >
                        {dropdownData && dropdownData.data && dropdownData.data.roles && dropdownData.data.roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                                {role.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} md={4} sm={6}>
                    <Typography variant="body2" sx={commonStyles}>Property Name</Typography>
                    <TextField label="Hyderabad campus" fullWidth
                        InputProps={{
                            sx: { height: '50px' }
                        }}
                        margin="dense" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default UsersOnboarding;
