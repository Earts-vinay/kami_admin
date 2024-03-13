import React, { useState } from 'react'
import SideNav from '../SideNav';
import { Box, Tab, Tabs } from '@mui/material';
import Detection from './SettingsInsideTabs/Detection';
import Notification from './SettingsInsideTabs/Notification';
import Database from './SettingsInsideTabs/Database';

const SettingsInside = () => {
    const [open, setOpen] = useState(true);
    const [selectedTab, setSelectedTab] = useState(0);
    const handleToggle = () => {
        setOpen(!open);
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
            <div style={{ display: 'flex' }}>
                <SideNav open={open} handleToggle={handleToggle} />
                <div style={{ marginLeft: open ? '250px' : '70px', padding: '10px', width: '100%', transition: 'margin 0.3s ease' }}>
                    <Box style={{ height: '93vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginLeft: '10px', marginRight: '10px' }}>
                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            sx={{
                                borderBottom: "none",
                                ".css-heg063-MuiTabs-flexContainer": {
                                    backgroundColor: "#c7d8fa",
                                    display:"flex",
                                    justifyContent:"space-between",
                                    borderRadius: "5px",
                                    boxShadow: "0 0 5px 0 rgba(36, 101, 233, 0.5)",
                                    marginX: "10px",
                                    fontWeight: "bold",
                                },
                            }}
                            TabIndicatorProps={{ style: { display: "none" } }}
                            size="small"
                        >
                            {[
                                " Detection",
                                " Notification",
                                " Database",

                            ].map((label, index) => (
                                <Tab
                                    key={index}
                                    label={label}
                                    sx={{
                                        textTransform: "capitalize",
                                        backgroundColor: selectedTab === index && "#2465e9",
                                        color: selectedTab === index && " white !important",
                                        width:"100%",
                                       
                                        borderRadius: "5px",
                                    }}
                                />
                            ))}
                        </Tabs>

                        <Box mt={0}>
                            <TabPanel value={selectedTab} index={0} sx={{}}>
                              <Detection/>
                            </TabPanel>
                            <TabPanel value={selectedTab} index={1}>

                               <Notification/>
                            </TabPanel>
                            <TabPanel value={selectedTab} index={2}>
                              <Database/>
                            </TabPanel>

                        </Box>
                    </Box>

                </div>
            </div>
        </>
    )
}

export default SettingsInside