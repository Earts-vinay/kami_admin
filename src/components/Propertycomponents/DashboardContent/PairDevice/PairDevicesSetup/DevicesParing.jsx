import React, { useState } from 'react'
import SideNav from '../../../../SideNav'
import { useNavigate } from 'react-router-dom';
import { selectIsSideNavOpen, toggleSideNav } from '../../../../../redux/sidenav/sidenavSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import DeviceSetup from './DeviceParingContent/DeviceSetup';
import DeviceView from './DeviceParingContent/DeviceView';
import AddLineOrPolygon from './DeviceParingContent/AddLineOrPolygon';

const DevicesParing = () => {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();
    const isOpen = useSelector(selectIsSideNavOpen);
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleSideNav());
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        navigate(`/`);
        setActiveStep(0);
    };

    const handlepair = () => {
        navigate(`/devicesparing`);


    };
    return (
        <div style={{ display: 'flex' }}>
            <SideNav open={isOpen} handleToggle={handleToggle} />
            <div style={{
                marginLeft: isOpen ? '220px' : '90px',
                padding: '10px', width: '100%', transition: 'margin 0.3s ease'
            }}>
                <Box style={{ height: '90vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginLeft: '10px', marginRight: '10px' }}>
                <Box padding="15px">
                    <Typography varient="h6"  >Devices Gate Cam 1</Typography>
                     <Typography varient="body-2" fontSize="12px">Configure the device and setup the events that you want each camera to detect.</Typography>
                    </Box>
                <Box paddingY="10px">
                <Stepper activeStep={activeStep} alternativeLabel>
                        <Step>
                            <StepLabel>Devices Setup</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>View Setup</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Add Lines & Polygons </StepLabel>
                        </Step>
                    </Stepper>
                </Box>

                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {activeStep === 0 && (
                            <Box>
                             <DeviceSetup/>
                            </Box>
                        )}
                        {activeStep === 1 && (
                            <Box>
                              <DeviceView/>
                            </Box>
                        )}
                        {activeStep === 2 && (
                            <Box>
                                <AddLineOrPolygon/>
                            </Box>
                        )}
                    </Box>

                    {/* Buttons */}
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                            Cancel
                        </Button>
                        {activeStep === 2 ? (
                            <Button variant="contained" color="primary" onClick={handleReset} sx={{ mr: 1 }}>
                                next
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={handleNext} sx={{ mr: 1 }}>
                                Next
                            </Button>
                        )}
                    </Box>

                </Box>
            </div>
        </div>
    )
}

export default DevicesParing


