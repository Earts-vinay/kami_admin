import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const Notification = () => {
  // Assuming you have an array of notifications
  const notifications = [
    { ruleType: 'Weekday Morning Shift Perimeter', location: 'San Jose, North Campus.', schedule: 'M' , time: '06AM - 10 AM' },
    { ruleType: 'Weekday Morning Shift Perimeter', location: 'San Jose, North Campus.', schedule: 'T', time: '06AM - 10 AM' },
    { ruleType: 'Weekday Morning Shift Perimeter', location: 'San Jose, North Campus.', schedule: 'M' , time: '06AM - 10 AM' },
    { ruleType: 'Weekday Morning Shift Perimeter', location: 'San Jose, North Campus.', schedule: 'T', time: '06AM - 10 AM' },
    { ruleType: 'Weekday Morning Shift Perimeter', location: 'San Jose, North Campus.', schedule: 'M' , time: '06AM - 10 AM' },
    { ruleType: 'Weekday Morning Shift Perimeter', location: 'San Jose, North Campus.', schedule: 'T', time: '06AM - 10 AM' },
    // Add more notification objects as needed
  ];

  return (
    <Box>
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
                <TableCell >
                  <Box display="flex" gap={2}>
                  <Button variant="contained" color="primary" style={{ borderRadius: '50%' }}>
                    {notification.schedule}
                  </Button>
                  <Button variant="contained" color="primary" style={{ borderRadius: '50%' }}>
                    {notification.schedule}
                  </Button>
                  </Box>
                </TableCell>
                <TableCell>{notification.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Notification;
