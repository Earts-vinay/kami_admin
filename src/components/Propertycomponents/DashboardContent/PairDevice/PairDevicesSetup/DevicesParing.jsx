import React, { useState } from 'react';
import SideNav from '../../../../SideNav';
import { useNavigate } from 'react-router-dom';
import { selectIsSideNavOpen, toggleSideNav } from '../../../../../redux/sidenav/sidenavSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import DeviceSetup from './DeviceParingContent/DeviceSetup';
import DeviceView from './DeviceParingContent/DeviceView';
import AddLineOrPolygon from './DeviceParingContent/AddLineOrPolygon';
import CustomButton from '../../../../CommonComponent/CustomButton';

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
        navigate(`/pairdevice`);
        setActiveStep(0);
    };

    const handlePair = () => {
        navigate(`/devicesparing`);
    };

    return (
        <div style={{ display: 'flex' }}>
            <SideNav open={isOpen} handleToggle={handleToggle} />
            <div style={{
                marginLeft: isOpen ? '220px' : '90px',
                padding: '10px', width: '100%', transition: 'margin 0.3s ease'
            }}>
                <Box style={{ height: '93vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginLeft: '10px', overflow: "auto" }}>
                    <Box padding="15px">
                        <Typography varient="h6" >Pair a new Device / Camera</Typography>
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

                    <Box sx={{ display: "flex", flexDirection: "column", overflow: "auto" }}>
                        {activeStep === 0 && (
                            <Box>
                                <DeviceSetup />
                            </Box>
                        )}
                        {activeStep === 1 && (
                            <Box>
                                <DeviceView />
                            </Box>
                        )}
                        {activeStep === 2 && (
                            <Box>
                                <AddLineOrPolygon />
                            </Box>
                        )}
                    </Box>

                    {/* Buttons */}
                    <Box sx={{ display: "flex", justifyContent: "center",gap:'10px' }}>
                        {activeStep === 0 && (
                            <>
                            <CustomButton onClick={handleBack} sx={{ mr: 1 }}>Cancel</CustomButton>
                            <CustomButton onClick={handleNext} sx={{ mr: 1 }}>Next</CustomButton>
                            </>
                        )}
                        {activeStep !== 0 && activeStep !== 2 && (
                            <>
                            <CustomButton onClick={handleBack} sx={{ mr: 1 }}>Back</CustomButton>
                            <CustomButton onClick={handleNext} sx={{ mr: 1 }}>Next</CustomButton>                     
                            </>
                        )}
                        {activeStep === 2 && (
                            <>
                            <CustomButton onClick={handleBack} sx={{ mr: 1 }}>Back</CustomButton>
                            <CustomButton onClick={handleReset} sx={{ mr: 1 }}>Save</CustomButton>
                            </>
                        )}
                    </Box>
                </Box>
            </div>
        </div>
    )
}

export default DevicesParing;
