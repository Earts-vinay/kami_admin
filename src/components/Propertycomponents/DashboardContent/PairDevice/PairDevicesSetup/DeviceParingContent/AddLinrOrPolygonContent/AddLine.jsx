import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SnowshoeingIcon from "@mui/icons-material/Snowshoeing";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { styled } from '@mui/material/styles';
import CustomButton from '../../../../../../CommonComponent/CustomButton';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const AddLine = () => {
  const [open, setOpen] = useState(false); // State to manage the dialog

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Column layout on small screens, row layout on medium screens and above
          gap: '10px',
          paddingY: '30px',
        }}
      >
        {/* Compass Image */}
        <Box sx={{ width: { xs: '100%', md: '50%',sm:"80%" }, padding: '20px' }}>
          {/* Textfield */}
          <Typography> Line Name</Typography>
          <TextField label="Line Name" variant="outlined" size="small" fullWidth margin="dense" />

          {/* MUI Table */}
          <Table>
            <TableBody>
              {/* Row 1 */}
              <TableRow>
                <TableCell>
                <SnowshoeingIcon sx={{color:"#2465e9"}}/>
                </TableCell>
                <TableCell>Person detection</TableCell>
                <TableCell>
                <AntSwitch
                    defaultChecked={"on"}
                    inputProps={{ 'aria-label': 'Raise Alerts' }}
                  />
                </TableCell>
              </TableRow>
              {/* Row 2 */}
              <TableRow>
                <TableCell>
                  <DirectionsCarIcon sx={{color:"#2465e9"}}/>
                </TableCell>
                <TableCell>Vehicle detection</TableCell>
                <TableCell>
                <AntSwitch
                    defaultChecked={"on"}
                    inputProps={{ 'aria-label': 'Raise Alerts' }}
                  />
                </TableCell>
              </TableRow>
              {/* Row 3 */}
              <TableRow>
                <TableCell>
                  <img src="assets/icons/licenceplate.svg" alt="Plate Icon" />
                </TableCell>
                <TableCell>Licence plate</TableCell>
                <TableCell>
                <AntSwitch
                    defaultChecked={"on"}
                    inputProps={{ 'aria-label': 'Raise Alerts' }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* MUI Dropdown */}
          <Box py={3}>
            <Typography> Zone Name</Typography>
            <TextField label="Zone Name" select fullWidth margin="dense" size="small">
              <Button px={3} color="primary" onClick={handleOpen}>
                Add New Zone
              </Button>
              <MenuItem value={10}>Option 1</MenuItem>
              <MenuItem value={20}>Option 2</MenuItem>
              <MenuItem value={30}>Option 3</MenuItem>
            </TextField>
          </Box>
        </Box>

        {/* Image */}
        <Box width={{ xs: '100%', md: '50%',sm:'100%' }}>
          <img src="assets/images/deviceview.png" backgroundColor="black" alt="" width="100%"/>
        </Box>
      </Box>

      {/* Dialog for adding new zone */}
      <Dialog open={open} onClose={handleClose}>
        <Typography backgroundColor=" #2465e9" color="white" borderRadius="5px 5px 0px 0px" p={2}>
          Add New Zone
        </Typography>
        <CloseIcon
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            color: 'white',
            cursor: 'pointer',
            paddingY: '6px',
            paddingX: '10px',
          }}
          onClick={handleClose}
        />
        <DialogContent>
          <Typography width="500px">Zone Name</Typography>
          <TextField fullWidth size="small" id="outlined-basic" label="Enter view name here" variant="outlined" margin="dense" />
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <CustomButton onClick={handleClose}>Back</CustomButton>
          <CustomButton onClick={handleClose}>Save</CustomButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddLine;
