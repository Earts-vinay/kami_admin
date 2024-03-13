import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

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

const Detection = () => {
  // Sample data array
  const detectionData = [
    { type: 'Person Detection', raiseAlerts: true, status: true },
    { type: 'Vehicle Detection', raiseAlerts: false, status: true },
    { type: 'License Plate Detection', raiseAlerts: true, status: false },
    // Add more data as needed
  ];

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Detection Type</TableCell>
              <TableCell>Raise Alerts</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {detectionData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.type}</TableCell>
                <TableCell >
                 <Box sx={{display:"flex",alignItems:"center", gap:"10px"}}>
                 <AntSwitch
                    defaultChecked={row.raiseAlerts}
                    inputProps={{ 'aria-label': 'Raise Alerts' }}
                  />
                  <Typography>{row.raiseAlerts ? 'Active' : 'Inactive'}</Typography>
                 </Box>
                </TableCell>
                <TableCell>
                <Box sx={{display:"flex",alignItems:"center", gap:"10px"}}>
                  <AntSwitch
                    defaultChecked={row.status}
                    inputProps={{ 'aria-label': 'Status' }}
                  />
                  {row.status ? 'Active' : 'Inactive'}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Detection;
