import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';

const DeviceView = () => {
  return (
    <>
      <Box sx={{ display: 'flex', gap: '10px', paddingY: '30px', alignItems: "center", justifyContent: "center" }}>
        {/* Compass Image */}
        <Box sx={{ width: '50%', padding: '20px', display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box sx={{ position: 'relative', width: "35%" }}>
            <img src="assets/icons/compas.svg" backgroundColor="black" alt="" />

            {/* Arrows */}
            <IconButton sx={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', borderRadius: '50%', borderRadius: '50%',backgroundColor:"#2E3137",color:"white" }}>
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton sx={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', borderRadius: '50%', borderRadius: '50%',backgroundColor:"#2E3137",color:"white" }}>
              <KeyboardArrowRightIcon />
            </IconButton>
            <IconButton sx={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', borderRadius: '50%',backgroundColor:"#2E3137",color:"white"  }}>
              <KeyboardArrowUpIcon />
            </IconButton>
            <IconButton sx={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', borderRadius: '50%',backgroundColor:"#2E3137",color:"white" }}>
              <KeyboardArrowDownIcon/>
            </IconButton>
          </Box>
        </Box>

        <Box width="50%">
          <img src="assets/images/deviceview.png" backgroundColor="black" alt="" />
        </Box>
      </Box>
    </>
  );
};

export default DeviceView;
