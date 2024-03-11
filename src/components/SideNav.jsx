// SideNav.js
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Button, Toolbar, IconButton, Box, Typography } from '@mui/material';
import { Link,useLocation } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DevicesIcon from '@mui/icons-material/Devices';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import moment from 'moment';

const SideNav = ({ open, handleToggle }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const useStyles = () => ({
        drawer: {
            width: open ? 240 : 64,
            flexShrink: 0,
            transition: 'width 0.3s ease',
            background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4))`,
        },
        drawerPaper: {
            width: open ? 240 : 64,
            transition: 'width 0.3s ease',
            background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4))`,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        logo: {
            height: '50px',
            marginRight: '10px',
            width: "50px"
        },
        upgradeButton: {
            marginTop: 'auto',
        },
    });

    const classes = useStyles();

    const renderListItemText = (text) => {
        return open ? (
            <ListItemText primary={text} />
        ) : null;
    };

    return (
        <Drawer
            variant="permanent"
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper,
            }}
            sx={{
                '.css-12i7wg6-MuiPaper-root-MuiDrawer-paper': {
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4)) !important',
                    margin: "10px",
                    borderRadius: "10px"
                },

            }}

        >
            <Toolbar sx={{ display: "flex", justifyContent: "end", pading: "0px" }}>
                <IconButton onClick={handleToggle}>
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Toolbar>
            <div className={classes.drawerContainer}>
                <List>
                    <Box display="flex" justifyContent="center" px={2}>
                        <img src="assets/logos/logo.png" alt="Logo" width="200px" />
                    </Box>

                    <ListItem sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <ListItemIcon>
                            <img src="assets/icons/girlicon.svg" alt="" /><br />
                        </ListItemIcon>
                        <Typography variant="subtitle1">{renderListItemText('Welcome, Marry James')}</Typography>
                        <Typography variant="body2">{moment().format('MM-DD-YYYY | h:mm a')}</Typography>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                        </ListItemIcon>
                    </ListItem>
                </List>
                <List>
                    <ListItem button component={Link} to="/"   
                    sx={{
                            backgroundColor: isActive("/") ? "rgba(36, 101, 233, 0.5)" : "transparent", // Apply rgba(36, 101, 233, 0.5) background when active
                            "&:hover": {
                                backgroundColor: "rgba(36, 101, 233, 0.5)",
                            },
                            marginX:"10px",
                            borderRadius:"10px"
                        }}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        {renderListItemText('Organization')}
                    </ListItem>
                    <ListItem button component={Link} to="/devices" 
                     sx={{
                            backgroundColor: isActive("/devices") ? "rgba(36, 101, 233, 0.5)" : "transparent", // Apply rgba(36, 101, 233, 0.5) background when active
                            "&:hover": {
                                backgroundColor: "rgba(36, 101, 233, 0.5)",
                            },
                            marginX:"10px",
                            borderRadius:"10px"
                        }}>
                        <ListItemIcon>
                            <DevicesIcon />
                        </ListItemIcon>
                        {renderListItemText('Devices')}
                    </ListItem>
                    <ListItem button component={Link} to="/users"
                       sx={{
                            backgroundColor: isActive("/users") ? "rgba(36, 101, 233, 0.5)" : "transparent", // Apply rgba(36, 101, 233, 0.5) background when active
                            "&:hover": {
                                backgroundColor: "rgba(36, 101, 233, 0.5)",
                            },
                            marginX:"10px",
                            borderRadius:"10px"
                        }}>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        {renderListItemText('Users')}
                    </ListItem>
                    <ListItem button component={Link} to="/settings" 
                      sx={{
                            backgroundColor: isActive("/settings") ? "rgba(36, 101, 233, 0.5)" : "transparent", // Apply rgba(36, 101, 233, 0.5) background when active
                            "&:hover": {
                                backgroundColor: "rgba(36, 101, 233, 0.5)",
                            },
                            marginX:"10px",
                            borderRadius:"10px"
                        }}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        {renderListItemText('Settings')}
                    </ListItem>
                    <ListItem button component={Link} to="/myprofile"
                      sx={{
                            backgroundColor: isActive("/myprofile") ? "rgba(36, 101, 233, 0.5)" : "transparent", // Apply rgba(36, 101, 233, 0.5) background when active
                            "&:hover": {
                                backgroundColor: "rgba(36, 101, 233, 0.5)",
                            },
                            marginX:"10px",
                            borderRadius:"10px"
                        }}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        {renderListItemText('My Profile')}
                    </ListItem>
                    <ListItem button component={Link} to="/login"
                       sx={{
                            backgroundColor: isActive("/login") ? "rgba(36, 101, 233, 0.5)" : "transparent", // Apply rgba(36, 101, 233, 0.5) background when active
                            "&:hover": {
                                backgroundColor: "rgba(36, 101, 233, 0.5)",
                            },
                            marginX:"10px",
                            borderRadius:"10px"
                        }}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        {renderListItemText('Logout')}
                    </ListItem>
                </List>
             
                <Box
                    sx={{
                        border: '1px solid white',
                        borderRadius: '10px',
                        padding: '10px',
                        margin: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                       
                    }}
                >
                    <img src="assets/logos/saplogo.svg" alt=""  width="200px"/>
                    {/* Text inside the box */}
                    <Typography varient="body-2" mt={1} width="200px">Our AI platform uses computer vision to provide.</Typography>
                    {/* Add any additional content as needed */}
                </Box>
            </div>
        </Drawer >
    );
};

export default SideNav;
