import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import OnboardingCompany from '../components/OrganizationContent/OnboardingCompany';
import PropertyOnboarding from '../components/OrganizationContent/PropertyOnboarding';
import UsersOnboarding from '../components/OrganizationContent/UsersOnboarding';

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
      <Box sx={{ backgroundColor: "white", borderRadius: "10px", padding: "10px" }}>
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

      <Box sx={{ backgroundColor: "white", borderRadius: "10px", padding: "10px", marginTop: "20px" }}>
        {/* Stepper content for each step */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {activeStep === 0 && (
            <Box>
              <OnboardingCompany />
            </Box>
          )}
          {activeStep === 1 && (
            <Box>
              <PropertyOnboarding />
            </Box>
          )}
          {activeStep === 2 && (
            <Box>
              <UsersOnboarding />
            </Box>
          )}
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
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
    </>
  );
};



export default Organization;
