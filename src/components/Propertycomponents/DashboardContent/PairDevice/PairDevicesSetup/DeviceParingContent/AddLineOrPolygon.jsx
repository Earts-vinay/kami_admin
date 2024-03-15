import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddLine from './AddLinrOrPolygonContent/AddLine';

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
                                        <TableCell>Name</TableCell>
                                        <TableCell>Lines/Polygon</TableCell>
                                        <TableCell>Detection</TableCell>
                                        <TableCell>Zone</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* Mapping over data array to dynamically render table rows */}
                                    {data.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.linesPolygon}</TableCell>
                                            <TableCell>{row.detection}</TableCell>
                                            <TableCell>{row.zone}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box textAlign="center" py={2}>
                            <Button color="primary" textTransform="capitalize" onClick={() => setShow(true)}>Add Line</Button>/
                            <Button color="primary" textTransform="capitalize">Add Polygon</Button>
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
