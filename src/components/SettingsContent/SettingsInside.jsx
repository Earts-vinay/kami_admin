import React, { useState } from 'react';
import SideNav from '../SideNav';
import { Box, Tab, Tabs } from '@mui/material';
import Detection from './SettingsInsideTabs/Detection';
import Notification from './SettingsInsideTabs/Notification';
import Database from './SettingsInsideTabs/Database';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../redux/sidenav/sidenavSlice';
import HeaderLayout from '../CommonComponent/HeaderLayout';

const commonStyles = {
    fontFamily: "montserrat-regular",
};
const SettingsInside = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const isOpen = useSelector(selectIsSideNavOpen);
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleSideNav());
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const TabPanel = ({ value, index, children }) => (
        <div hidden={value !== index}>
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );

    return (
        <>
            <HeaderLayout>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    sx={{
                        borderBottom: 'none',
                        '.css-heg063-MuiTabs-flexContainer': {
                            backgroundColor: '#c7d8fa',
                            display: 'flex',
                            justifyContent: 'space-between',
                            borderRadius: '5px',
                            boxShadow: '0 0 5px 0 rgba(36, 101, 233, 0.5)',

                            fontWeight: 'bold',
                        },
                    }}
                    TabIndicatorProps={{ style: { display: 'none' } }}
                    size="small"
                >
                    {['Detection', 'Notification', 'Database'].map((label, index) => (
                        <Tab
                            key={index}
                            label={label}
                            sx={{
                                textTransform: 'capitalize',
                                backgroundColor: selectedTab === index && '#2465e9',
                                color: selectedTab === index && 'white !important',
                                width: { xs: '100%', sm: '30%' }, // Adjust width for responsiveness
                                borderRadius: '5px',
                                ...commonStyles
                            }}
                        />

                    ))}
                </Tabs>

                <Box mt={0} sx={{ padding: "0px Important" }}>
                    <TabPanel value={selectedTab} index={0} sx={{}}>
                        <Detection />
                    </TabPanel>
                    <TabPanel value={selectedTab} index={1}>
                        <Notification />
                    </TabPanel>
                    <TabPanel value={selectedTab} index={2}>
                        <Database />
                    </TabPanel>
                </Box>
            </HeaderLayout>
        </>
    );
};

export default SettingsInside;
