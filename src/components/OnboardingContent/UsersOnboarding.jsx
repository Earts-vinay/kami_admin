import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

const UsersOnboarding = ({ dropdownData }) => {
    const [accessLevel, setAccessLevel] = useState("");

    return (
        <Box sx={{ padding: "20px", marginX: "200px", height: "70vh" }}>
            <Grid container spacing={2} alignItems="center">
                {/* First Row */}
                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="flex-end">
                        {/* Text Field 1 */}
                        <Grid item xs={4}>
                            <Typography variant="body2">User Name</Typography>
                            <TextField label="John Doe" fullWidth size='small' margin="dense" />
                        </Grid>

                        {/* Text Field 2 */}
                        <Grid item xs={4}>
                            <Typography variant="body2">Email Id</Typography>
                            <TextField label="JohnDoe@gmail.com" fullWidth size='small' margin="dense" />
                        </Grid>

                        {/* Send Invite Button */}
                        <Grid item xs={4}>
                            <Button variant="contained" color="primary" startIcon={<SendIcon />} fullWidth sx={{ marginBottom: "7px" }}>
                                Send Invite
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Second Row */}
                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
          <Typography variant="body2">Access Level</Typography>
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

                        <Grid item xs={4}>
                            <Typography variant="body2">Property Name</Typography>
                            <TextField label="Hyderabad campus" fullWidth size='small' margin="dense" />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UsersOnboarding;
