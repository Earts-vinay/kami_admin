import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import OnboardingCompany from '../components/OrganizationContent/OnboardingCompany';
import PropertyOnboarding from '../components/OrganizationContent/PropertyOnboarding';

const Organization = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Box sx={{backgroundColor:"white", borderRadius:"10px",padding:"10px"}}>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step>
            <StepLabel>Company</StepLabel>
          </Step>
          <Step>
            <StepLabel>Property Onboarding</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 3</StepLabel>
          </Step>
        </Stepper>
      </Box>

      <Box sx={{backgroundColor:"white", borderRadius:"10px",padding:"10px",marginTop:"20px"}}>
        {/* Stepper content for each step */}
        {activeStep === 0 && (
          <Box>
            <OnboardingCompany/>
          </Box>
        )}
        {activeStep === 1 && (
          <Box>
            <PropertyOnboarding/>
          </Box>
        )}
        {activeStep === 2 && (
          <Box>
            <Typography>Step 3 Content Goes Here</Typography>
          </Box>
        )}

<Box display="flex" justifyContent="center">
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep === 2 ? (
          <Button variant="contained" color="primary" onClick={handleReset}>
            Reset
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
      </Box>

     
    </>
  );
};

export default Organization;
