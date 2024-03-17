import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

const commonStyles = {
    fontFamily: "montserrat-regular",
  };

const UsersOnboarding = ({ dropdownData }) => {
    const [accessLevel, setAccessLevel] = useState("");

    return (
        <Box sx={{ padding: "20px", marginX: "auto", maxWidth: "1200px",height:'65vh' }}>
            <Grid container spacing={2} alignItems="center">
                {/* First Row */}
                <Grid item xs={12} md={4} sm={6}>
                    <Typography variant="body2" sx={commonStyles} >User Name</Typography>
                    <TextField label="John Doe" fullWidth size='small' margin="dense" />
                </Grid>

                <Grid item xs={12} md={4} sm={6}>
                    <Typography variant="body2" sx={commonStyles}>Email Id</Typography>
                    <TextField label="JohnDoe@gmail.com" fullWidth size='small' margin="dense" />
                </Grid>

                <Grid item xs={12} md={4} sm={7} sx={{ marginTop: "18px" }}>
                    <Button variant="contained" color="primary" startIcon={<SendIcon />} fullWidth >
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
                        size="small"
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
                    <TextField label="Hyderabad campus" fullWidth size='small' margin="dense" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default UsersOnboarding;
