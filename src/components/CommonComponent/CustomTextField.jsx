import React from 'react';
import TextField from '@mui/material/TextField';

const CustomTextField = ({ label, value, onChange, ...rest }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      margin="dense"
      variant="outlined"
      fullWidth
      sx={{
        "&:hover .MuiOutlinedInput-root": {
            "& > fieldset": { border: '1px solid #2465e9'},
          },
        "& .MuiOutlinedInput-root": {
            "& > fieldset": { border: "solid 1px #2465e9"},
          },}}
      InputLabelProps={{
        style: { fontFamily: 'montserrat-regular' },
      }}
      InputProps={{
        style: {
           
          fontFamily: 'montserrat-regular',
          padding: '10px', // Adjust padding as needed
          height: '50px', // Set the height of the input
        },
      }}
      {...rest}
    />
  );
};

export default CustomTextField;
