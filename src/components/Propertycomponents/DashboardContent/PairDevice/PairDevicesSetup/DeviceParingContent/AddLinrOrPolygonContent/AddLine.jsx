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
      <Box sx={{ display: 'flex', gap: '10px', paddingY: '30px'}}>
        {/* Compass Image */}
        <Box sx={{ width: '50%', padding: '20px'}}>
          {/* Textfield */}
          <Typography> Line Name</Typography>
          <TextField label="Textfield" variant="outlined" size='small' fullWidth margin="dense" />

          {/* MUI Table */}
          <Table>
            <TableBody>
              {/* Row 1 */}
              <TableRow>
                <TableCell>
                  <img src="walking_icon.png" alt="Walking Icon" />
                </TableCell>
                <TableCell>Person detection</TableCell>
                <TableCell>
                  <FormControlLabel control={<Switch />} label="On/Off" />
                </TableCell>
              </TableRow>
              {/* Row 2 */}
              <TableRow>
                <TableCell>
                  <img src="vehicle_icon.png" alt="Vehicle Icon" />
                </TableCell>
                <TableCell>Vehicle detection</TableCell>
                <TableCell>
                  <FormControlLabel control={<Switch />} label="On/Off" />
                </TableCell>
              </TableRow>
              {/* Row 3 */}
              <TableRow>
                <TableCell>
                  <img src="plate_icon.png" alt="Plate Icon" />
                </TableCell>
                <TableCell>Licence plate</TableCell>
                <TableCell>
                  <FormControlLabel control={<Switch />}  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* MUI Dropdown */}
          <Box py={3}>
            <Typography> Zone Name</Typography>
            <Select label="Dropdown" variant="outlined" size='small' fullWidth margin="dense">
              <Button px={3} color="primary" onClick={handleOpen}>Add New Zone</Button>
              <MenuItem value={10}>Option 1</MenuItem>
              <MenuItem value={20}>Option 2</MenuItem>
              <MenuItem value={30}>Option 3</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* Image */}
        <Box width="50%">
          <img src="assets/images/deviceview.png" backgroundColor="black" alt="" />
        </Box>
      </Box>

      {/* Dialog for adding new zone */}
      <Dialog open={open} onClose={handleClose}>
      <Typography backgroundColor=" #2465e9" color="white" borderRadius="5px 5px 0px 0px" p={2}>Add New Zone</Typography>
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
              <TextField fullWidth size='small' id="outlined-basic" label="Enter view name here" variant="outlined" margin="dense" />
            </DialogContent>
            <DialogActions sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "capitalize" }}>
              <Button onClick={handleClose} variant="contained" disabled sx={{ textTransform: 'capitalize'}}>Back</Button>
              <Button onClick={handleClose} variant="contained" sx={{ textTransform: 'capitalize'}}>
                Save
              </Button>
           </DialogActions>
      
      </Dialog>
    </>
  )
}

export default AddLine;
