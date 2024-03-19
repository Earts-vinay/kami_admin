import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const CustomSearch = ({ searchValue, handleSearchChange,label }) => {
  return (
    <TextField
      fullWidth
      label={label}
      value={searchValue}
      onChange={handleSearchChange}
      variant="outlined"
      margin="dense"
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
        sx: { height: "50px" },
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon sx={{color:"#2465e9"}}/>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CustomSearch;
