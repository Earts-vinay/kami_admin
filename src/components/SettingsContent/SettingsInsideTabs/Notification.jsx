import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, Checkbox, FormControlLabel, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Notification = () => {
  const [open, setOpen] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  const [smsChecked, setSmsChecked] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveNotification = () => {
    // Implement your save logic here
    console.log('Notification saved:', { roleName, dayOfWeek, startTime, endTime, emailChecked, smsChecked });
    handleClose();
  };


  const notifications = [
    { ruleType: 'Weekday Morning Shift Perimeter', location: 'San Jose, North Campus.', schedule: ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'], time: '06AM - 10 AM' },
    { ruleType: 'Weekday Morning Shift Perimeter', location: 'San Jose, North Campus.', schedule: ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'], time: '06AM - 10 AM' },
    { ruleType: 'Weekday Morning Shift Perimeter', location: 'San Jose, North Campus.', schedule: ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'], time: '06AM - 10 AM' },
    { ruleType: 'Weekday Morning Shift Perimeter', location: 'San Jose, North Campus.', schedule: ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'], time: '06AM - 10 AM' },
    { ruleType: 'Weekday Morning Shift Perimeter', location: 'San Jose, North Campus.', schedule: ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'], time: '06AM - 10 AM' },
    { ruleType: 'Weekday Morning Shift Perimeter', location: 'San Jose, North Campus.', schedule: ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'], time: '06AM - 10 AM' },
    // Add more notification objects as needed
  ];

  return (
   <>
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rule Type</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Schedule</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification, index) => (
              <TableRow key={index}>
                <TableCell>{notification.ruleType}</TableCell>
                <TableCell>{notification.location}</TableCell>
                <TableCell>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {notification.schedule.map((day) => (
                      <Button key={day} variant="contained" color="primary" style={{ borderRadius: '50%', minWidth: '36px', height: '36px', padding: '0', textTransform: 'capitalize' }}>
                        {day}
                      </Button>
                    ))}
                  </Box>
                </TableCell>
                <TableCell>{notification.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box textAlign="center" marginTop={2}>
        <Button variant="outlined" color="primary" onClick={handleOpen}>
          Add Notification
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose} sx={{ borderRadius: "5px" }}>
        <Typography backgroundColor=" #2465e9" color="white" borderRadius="5px 5px 0px 0px" p={2}>
          Add Notification
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
          <Typography>Role Name</Typography>
          <TextField
            label="Role Name"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            fullWidth
            margin="dense"
            size="small"
          />
          <Box py={1}>
            <Typography pb={1}>Day of Week</Typography>
            <Box display="flex" gap={1} alignItems="center" marginBottom="8px">
              {['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'].map((day) => (
                <Button key={day} variant="contained" color="primary" style={{ borderRadius: '50%', minWidth: '36px', height: '36px', padding: '0', textTransform: "capitalize" }}>
                  {day}
                </Button>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Box>
              <Typography>Start Time</Typography>
              <TextField
                label="Start Time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                fullWidth
                margin="dense"
                size="small"
              />
            </Box>
            <Box>
              <Typography>End Time</Typography>
              <TextField
                label="End Time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                fullWidth
                margin="dense"
                size="small"
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Box py={1}>
              <Typography>Receivers</Typography>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="dense"
                size="small"
                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2465E9' } } }}
              />
            </Box>
            <Box pt={3}>
              <FormControlLabel
                control={<Checkbox checked={emailChecked} onChange={(e) => setEmailChecked(e.target.checked)} />}
                label="Email"
              />
              <FormControlLabel
                control={<Checkbox checked={smsChecked} onChange={(e) => setSmsChecked(e.target.checked)} />}
                label="SMS"
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <Button variant="outlined" sx={{ textTransform: "capitalize" }} color="primary" onClick={handleSaveNotification}>
              Cancel
            </Button>
            <Button variant="contained" sx={{ textTransform: "capitalize" }} color="primary" onClick={handleSaveNotification}>
              Save
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
   </>
  );
};

export default Notification;
