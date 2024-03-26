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
import { clearAuthentication, selectIsAuthenticated, selectUser } from '../redux/apiResponse/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUrls } from '../redux/onBoarding/onboardingCompanySlice';
import { clearTokenAndUser } from '../redux/apiResponse/loginApiSlice';
import { clearData, fetchDataFailure, fetchDataStart } from '../redux/apiResponse/dictionarySlice';

const SideNav = ({ open, handleToggle }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const dispatch = useDispatch();

    const user = useSelector(selectUser);

    const userLevel = user && user.role ? user.role.level : null;

    // console.log(userLevel);

    const urls = useSelector(selectUrls);
    // console.log(urls);

    const logoUrl = urls.length > 0 ? urls[0] : (open ? "assets/logos/logo.png" : "assets/logos/smalllogo.svg");

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
        padding: open ? "10px" : "10px",
        "&:hover": {
            backgroundColor: open ? "#f0f0f0" : "#f0f0f0",
        },
        "&.active": {
            backgroundColor: "#C7D8FA",
        },
        marginBottom: "15px",
    };

    const handleLogout = () => {
        dispatch(clearTokenAndUser());
        dispatch(clearAuthentication());
        dispatch(clearData());
        dispatch(fetchDataStart());
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
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            px={2}
                            mb={open ? 2 : 0}
                            pt={3}
                            style={{
                                backgroundColor: open ? 'rgba(0, 0, 0, 0)' : 'inherit',
                                width: open ? '180px' : 'auto',
                                height: open ? '50px' : 'auto',
                            }}
                        >
                            <div
                                className={classes.logo}
                                style={{
                                    width: open ? '180px' : '50px',


                                    height: '100%',
                                    backgroundImage: `url(${logoUrl})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center',
                                    transition: 'width 0.3s ease',
                                }}
                            />
                        </Box>

                        <ListItem sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }} mb={open ? 2 : 0}>
                            <ListItemIcon style={{ width: open ? 'auto' : '50px', textAlign: 'center' }}>
                                <img src="https://hatimi.s3.amazonaws.com/kamiWebsite/girlicon.svg" alt="" style={{ height: open ? '50px' : '60px', width: open ? '50px' : '60px', margin: open ? "" : "auto", transition: 'height 0.3s ease, width 0.3s ease' }} />
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
                            to={userLevel === 'company' ? "/organization" : "/dashboard"}
                            sx={listItemStyle}
                            className={isActive(userLevel === 'company' ? "/organization" : "/dashboard") ? "active" : ""}
                        >
                            <ListItemIcon style={{ fontSize: '24px' }}>
                                {userLevel === 'company' ? <img src="assets/icons/organizationicon.svg" alt="" width="20px"  /> : <img src="assets/icons/organizationicon.svg" alt="" width="20px"  />}
                            </ListItemIcon>
                            <ListItemText primary={open && (userLevel === 'company' ? 'Organization' : 'Dashboard')} />
                        </ListItem>

                        <ListItem
                            button
                            component={Link}
                            to="/devices"
                            sx={listItemStyle}
                            className={isActive("/devices") ? "active" : ""}
                        >
                            <ListItemIcon>                             
                                <img src="assets/icons/devicesicon.svg" alt="" width="20px" />
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
                                <img src="assets/icons/usericon.svg" alt="" width="20px"  />                             
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
                            <img src="assets/icons/settingicon.svg" alt="" width="20px"  />
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
                            <img src="assets/icons/myprofileicon.svg" alt="" width="20px"  />
                            </ListItemIcon>
                            <ListItemText primary={open && 'My Profile'} />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="/"
                            sx={listItemStyle}
                            className={isActive("/") ? "active" : ""}
                            onClick={handleLogout}
                        >
                            <ListItemIcon>
                            <img src="assets/icons/logouticon.svg" alt="" width="20px"  />
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
