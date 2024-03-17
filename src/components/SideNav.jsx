import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Button, Toolbar, IconButton, Box, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DevicesIcon from '@mui/icons-material/Devices';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactEmergencyOutlinedIcon from '@mui/icons-material/ContactEmergencyOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import sideButton from '../assets/sideButton.svg';

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
            position: 'relative', 
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

    const listItemStyle = {
        marginX: open ? "10px" : "auto",
        borderRadius: "5px",
        width: open ? "auto" : "45px",
        transition: "width 0.3s ease",
        padding: open ? "10px" : "10px", // Add padding for icons when sidebar is closed
        "&:hover": {
            backgroundColor: open ? "#f0f0f0" : "#f0f0f0",
        },
        "&.active": {
            backgroundColor: "#C7D8FA", // Sky blue color for selected item
        },
        marginBottom: "15px", // Add some gap between list items
    };

    return (
        <>
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
                        borderRadius: "10px",
                        height: '96vh'
                    },
    
                }}
            >
                <div className={classes.drawerContainer}>
                    <List>
                        <Box display="flex" justifyContent="center" px={2} mb={open ? 2 : 0} pt={3}>
                            <img
                                src={open ? "assets/logos/logo.png" : "assets/logos/smalllogo.svg"}
                                alt="Logo"
                                className={classes.logo}
                                style={{
                                    display: open ? 'block' : 'none',
                                    width: open ? '180px' : '50px',
                                    transition: 'width 0.3s ease'
                                }}
                            />
                        </Box>

                        <ListItem sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }} mb={open ? 2 : 0}>
                            <ListItemIcon style={{ width: open ? 'auto' : '50px', textAlign: 'center' }}>
                                <img src="assets/icons/girlicon.svg" alt="" style={{ height: open ? '50px' : '60px', width: open ? '50px' : '60px', margin: open ? "" : "auto", transition: 'height 0.3s ease, width 0.3s ease' }} />
                            </ListItemIcon>
                            <Typography variant="subtitle1" style={{ display: open ? 'block' : 'none', fontSize: open ? '15px' : '5px', textAlign: 'center', marginTop: '8px', fontWeight: 'bold' }}>Welcome, Marry James</Typography>
                            <Typography variant="body2" style={{ display: open ? 'block' : 'none', textAlign: 'center' }}>{moment().format('MM-DD-YYYY | h:mm a')}</Typography>
                        </ListItem>
                    </List>

                    <List style={{ marginTop: open ? '10px' : '30px' }}>
                        {/* List items with modified styles */}
                        <ListItem
                            button
                            component={Link}
                            to="/organization"
                            sx={listItemStyle}
                            className={isActive("/organization") ? "active" : ""}
                        >
                            <ListItemIcon style={{ fontSize: '24px' }}> {/* Adjust the font size as needed */}
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary={open && 'Organization'} />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="/devices"
                            sx={listItemStyle}
                            className={isActive("/devices") ? "active" : ""}
                        >
                            <ListItemIcon>
                                <DevicesIcon />
                            </ListItemIcon>
                            <ListItemText primary={open && 'Devices'} />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="/users"
                            sx={listItemStyle}
                            className={isActive("/users") ? "active" : ""}
                        >
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary={open && 'Users'} />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="/settings"
                            sx={listItemStyle}
                            className={isActive("/settings") ? "active" : ""}
                        >
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary={open && 'Settings'} />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="/myprofile"
                            sx={listItemStyle}
                            className={isActive("/myprofile") ? "active" : ""}
                        >
                            <ListItemIcon>
                                <ContactEmergencyOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={open && 'My Profile'} />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="/"
                            sx={listItemStyle}
                            className={isActive("/") ? "active" : ""}
                        >
                            <ListItemIcon>
                                <ExitToAppOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={open && 'Logout'} />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <img src={sideButton} style={{ position: 'absolute', left: open ? '210px' : '86px', top: 'calc(100% - 202px)', zIndex: 9999, cursor: 'pointer' }} onClick={handleToggle} />
        </>
    );
};

export default SideNav;
