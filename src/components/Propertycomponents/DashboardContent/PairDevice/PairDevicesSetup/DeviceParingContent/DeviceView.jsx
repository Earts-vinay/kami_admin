import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { Box, IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';

const DeviceView = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          paddingY: '30px',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: { xs: 'column', md: 'row' }, 
        }}
      >
        {/* Compass Image */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ position: 'relative', width: '%' }}>
            <img src="assets/icons/compas.svg" backgroundColor="black" alt="" />

            {/* Arrows */}
            <IconButton
              sx={{
                position: 'absolute',
                left: '-20px',
                top: '50%',
                transform: 'translateY(-50%)',
                borderRadius: '50%',
                backgroundColor: '#2E3137',
                color: 'white',
              }}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton
              sx={{
                position: 'absolute',
                right: '-20px',
                top: '50%',
                transform: 'translateY(-50%)',
                borderRadius: '50%',
                backgroundColor: '#2E3137',
                color: 'white',
              }}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
            <IconButton
              sx={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                borderRadius: '50%',
                backgroundColor: '#2E3137',
                color: 'white',
              }}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
            <IconButton
              sx={{
                position: 'absolute',
                bottom: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                borderRadius: '50%',
                backgroundColor: '#2E3137',
                color: 'white',
              }}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </Box>
        </Box>
        <Box width={{ xs: '100%', md: '50%',borderRadius:'10px' }}>
          <img src="assets/images/deviceview.png" backgroundColor="black" alt="" width="100%" borderRadius="10px"/>
        </Box>
      </Box>
    </>
  );
};

export default DeviceView;
