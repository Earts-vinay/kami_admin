
import React, { useEffect, useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import OnboardingCompany from '../../components/OnboardingContent/OnboardingCompany';
import PropertyOnboarding from '../../components/OnboardingContent/PropertyOnboarding';
import UsersOnboarding from '../../components/OnboardingContent/UsersOnboarding';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../redux/apiResponse/loginApiSlice';
import { fetchDataFailure, fetchDataStart, fetchDataSuccess } from '../../redux/apiResponse/dictionarySlice';
import CustomButton from '../../components/CommonComponent/CustomButton';

const OnboardingScreens = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    navigate(`/organization`);
    setActiveStep(0);
  };

  const fetchDropdownData = async () => {
    dispatch(fetchDataStart());
    try {
      const response = await axios.get('http://35.239.192.201:9092/api/dict', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(fetchDataSuccess(response.data));
      return response.data;
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
      dispatch(fetchDataFailure(error.message));
    }
  };

  const [dropdownData, setDropdownData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDropdownData();
        setDropdownData(data);
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Box sx={{ backgroundColor: "white", borderRadius: "10px", padding: "15px",margin:"20px" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step>
            <StepLabel>Company</StepLabel>
          </Step>
          <Step>
            <StepLabel>Property Onboarding</StepLabel>
          </Step>
          <Step>
            <StepLabel>User Onboarding</StepLabel>
          </Step>
        </Stepper>
      </Box>

      <Box sx={{ backgroundColor: "white", borderRadius: "10px", padding: "10px", margin: "20px" }}>
        {/* Stepper content for each step */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {activeStep === 0 && (
            <Box>
              <OnboardingCompany dropdownData={dropdownData} />
            </Box>
          )}
          {activeStep === 1 && (
            <Box>
              <PropertyOnboarding dropdownData={dropdownData} />
            </Box>
          )}
          {activeStep === 2 && (
            <Box>
              <UsersOnboarding dropdownData={dropdownData} />
            </Box>
          )}
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px",gap:'10px' }}>
          <CustomButton disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>Back</CustomButton>
          {activeStep === 2 ? (
            <CustomButton onClick={handleReset} sx={{ mr: 1 }}>Next</CustomButton>
          ) : (  
            <CustomButton onClick={handleNext} sx={{ mr: 1 }}>Next</CustomButton>
          )}
        </Box>
      </Box>
    </>
  );
};



export default OnboardingScreens;
