import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({ variant, color, onClick, size, width, children, disabled }) => {
  return (
    <Button
      variant="outlined"
      color={color}
      onClick={onClick}
      size="small"
      disabled={ disabled}
      sx={{
        textTransform:"capitalize",
        width:"100px",
        padding:"6px",
        '&:hover': {
         
          backgroundColor: "#2465e9",
          color: "white",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
