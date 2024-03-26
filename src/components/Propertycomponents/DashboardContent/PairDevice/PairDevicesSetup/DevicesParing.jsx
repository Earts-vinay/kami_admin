import React, { useState } from 'react';
import SideNav from '../../../../SideNav';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectIsSideNavOpen, toggleSideNav } from '../../../../../redux/sidenav/sidenavSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import DeviceSetup from './DeviceParingContent/DeviceSetup';
import DeviceView from './DeviceParingContent/DeviceView';
import AddLineOrPolygon from './DeviceParingContent/AddLineOrPolygon';
import CustomButton from '../../../../CommonComponent/CustomButton';
import HeaderLayout from '../../../../CommonComponent/HeaderLayout';

const commonStyles = {
    fontFamily: "montserrat-regular",
};
const DevicesParing = () => {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();
    const isOpen = useSelector(selectIsSideNavOpen);
    const dispatch = useDispatch();
    const location = useLocation();

    const deviceId = location.state ? location.state.id : null;
    // console.log(deviceId);

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
        <HeaderLayout>
            <Box padding="15px" flexGrow={1}>
                <Typography varient="h6" sx={commonStyles} >Pair a new Device / Camera</Typography>
                <Typography varient="body-2" sx={commonStyles} fontSize="12px">Configure the device and setup the events that you want each camera to detect.</Typography>
            </Box>
            <Box paddingY="10px">
                <Stepper activeStep={activeStep} alternativeLabel>
                    <Step>
                        <StepLabel sx={commonStyles}>Devices Setup</StepLabel>
                    </Step>
                    {/* <Step>
                        <StepLabel sx={commonStyles}>View Setup</StepLabel>
                    </Step> */}
                    <Step>
                        <StepLabel sx={commonStyles}>Add Lines & Polygons </StepLabel>
                    </Step>
                </Stepper>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", overflow: "auto" }}>
                {activeStep === 0 && (
                    <Box>
                        <DeviceSetup deviceId={deviceId} />
                    </Box>
                )}
                {/* {activeStep === 1 && (
                    <Box>
                        <DeviceView />
                    </Box>
                )} */}
                {activeStep === 1 && (
                    <Box>
                        <AddLineOrPolygon />
                    </Box>
                )}
            </Box>

            {/* Buttons */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: '10px' }}>
                {activeStep === 0 && (
                    <>
                        <CustomButton onClick={handleBack} sx={{ mr: 1 }}>Cancel</CustomButton>
                        <CustomButton onClick={handleNext} sx={{ mr: 1 }}>Next</CustomButton>
                    </>
                )}
                {/* {activeStep !== 0 && activeStep !== 2 && (
                    <>
                        <CustomButton onClick={handleBack} sx={{ mr: 1 }}>Back</CustomButton>
                        <CustomButton onClick={handleNext} sx={{ mr: 1 }}>Next</CustomButton>
                    </>
                )} */}
                {activeStep === 1 && (
                    <>
                        <CustomButton onClick={handleBack} sx={{ mr: 1 }}>Back</CustomButton>
                        <CustomButton onClick={handleReset} sx={{ mr: 1 }}>Save</CustomButton>
                    </>
                )}
            </Box>
        </HeaderLayout>


    )
}

export default DevicesParing;
