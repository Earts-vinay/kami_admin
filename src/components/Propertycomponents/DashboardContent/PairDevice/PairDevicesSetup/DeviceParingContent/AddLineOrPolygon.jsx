import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddLine from './AddLinrOrPolygonContent/AddLine';

const commonStyles = {
    fontFamily: "montserrat-regular",
  }; 
const AddLineOrPolygon = () => {
    const data = [
        { name: 'Example 1', linesPolygon: 'Line', detection: 'Detected', zone: 'Zone A' },
        { name: 'Example 2', linesPolygon: 'Polygon', detection: 'Not Detected', zone: 'Zone B' },
    ];

    const [show, setShow] = useState(false);

    return (
        <>
            {!show ? (
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '10px', paddingY: '30px' }}>
                    {/* Compass Image */}
                    <Box sx={{ width: { xs: '100%', md: '50%' }, padding: '20px' }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ background: 'rgba(211, 211, 211, 0.3)' }}>
                                        <TableCell sx={commonStyles}>Name</TableCell>
                                        <TableCell sx={commonStyles}>Lines/Polygon</TableCell>
                                        <TableCell sx={commonStyles}>Detection</TableCell>
                                        <TableCell sx={commonStyles}>Zone</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* Mapping over data array to dynamically render table rows */}
                                    {data.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell sx={commonStyles}>{row.name}</TableCell>
                                            <TableCell sx={commonStyles}>{row.linesPolygon}</TableCell>
                                            <TableCell sx={commonStyles}>{row.detection}</TableCell>
                                            <TableCell sx={commonStyles}>{row.zone}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box textAlign="center" py={2}>
                            <Button color="primary" sx={commonStyles}  textTransform="capitalize" onClick={() => setShow(true)}>Add Line</Button>/
                            <Button color="primary" sx={commonStyles}  textTransform="capitalize">Add Polygon</Button>
                        </Box>
                    </Box>
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                        <img src="assets/images/deviceview.png" style={{ width: '100%', height: 'auto' }} alt="" />
                    </Box>
                </Box>
            ) : (
                <AddLine />
            )}
        </>
    );
}

export default AddLineOrPolygon;
