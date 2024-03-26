import React, { useState, useEffect } from 'react';
import { Stage, Layer, Line, Image as KonvaImage } from 'react-konva';
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
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SnowshoeingIcon from "@mui/icons-material/Snowshoeing";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { styled } from '@mui/material/styles';
import CustomButton from '../../../../../../CommonComponent/CustomButton';
import CustomTextField from '../../../../../../CommonComponent/CustomTextField';
import CustomDropdown from '../../../../../../CommonComponent/CustomDropdown';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../../../../../redux/apiResponse/loginApiSlice';

const DrawOnImage = ({ drawType }) => {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState([]);
  const [specification, setSpecification] = useState([]);
  const [drawingAllowed, setDrawingAllowed] = useState(true);
  const [newPolygon, setNewPolygon] = useState(true); 
  const [polygons, setPolygons] = useState([]);
  const [image, setImage] = useState(null); // State for the background image

  const commonStyles = {
    fontFamily: "montserrat-regular",
  };
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

  useEffect(() => {
    const img = new window.Image();
    img.src = 'assets/images/deviceview.png'; 
    img.onload = () => {
      setImage(img);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (!drawingAllowed) return;
  
    const point = e.target.getStage().getPointerPosition();
    
    let updatedLines = [...lines];
  
    if (drawType === 'polygon' && newPolygon) {
      setLines([]); 
      setNewPolygon(false); 
      setSpecification([]); // Clear specification when starting a new polygon
    }
  
    if (drawType === 'polygon' && updatedLines.length > 0) {
      const distance = Math.sqrt(
        Math.pow(point.x - updatedLines[0].start.x, 2) +
        Math.pow(point.y - updatedLines[0].start.y, 2)
      );
  
      if (distance < 10) {
        updatedLines[updatedLines.length - 1].end = updatedLines[0].start;
        const polygonCoordinates = updatedLines.map(line => ({
          x: (line.start.x / image.width).toFixed(4),
          y: (line.start.y / image.height).toFixed(4)
        }));
        setSpecification([...specification, ...polygonCoordinates]);
        setLines([]);
        setNewPolygon(true);
        return;
      }
    }
  
    // If drawType is 'line' and there are already two points, create a line and reset lines
    if (drawType === 'line' && updatedLines.length === 2) {
      const lineCoordinates = updatedLines.map(line => ({
        x: (line.start.x / image.width).toFixed(4),
        y: (line.start.y / image.height).toFixed(4)
      }));
      setSpecification([...specification, ...lineCoordinates]);
      updatedLines = []; // Reset lines to start a new line
    }
  
    setLines([...updatedLines, { start: point, end: point }]);
  };
  

  const handleMouseMove = (e) => {
    if (lines.length > 0 && drawingAllowed) {
      const point = e.target.getStage().getPointerPosition();
      const updatedLines = [...lines];

      // Check if there are already two points
      if (updatedLines.length === 2) {
        return; // Exit the function to prevent further drawing
      }

      updatedLines[lines.length - 1].end = point;
      setLines(updatedLines);
    }
  };

  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClear = () => {
    setLines([]);
    setPolygons([]);
  };

  const handleUndo = () => {
    if (lines.length > 0) {
      setLines(lines.slice(0, -1));
    } else if (polygons.length > 0) {
      setPolygons(polygons.slice(0, -1));
    }
  };

  const token = useSelector(selectToken);
  const selectedProperty = useSelector(state => state.property.selectedProperty);
  // console.log(selectedProperty);
  const propertyId = selectedProperty ? selectedProperty.id : null;
  const propertyName = selectedProperty ? selectedProperty.name : null;
  // console.log(propertyId);

  const createLinePolygon = async () => {
    // Stringify the specification array and format each coordinate object
    const specificationString = JSON.stringify(specification.map(coord => ({ x: coord.x, y: coord.y })));
  
    const payload = {
      camera_id: '1',
      property_id: propertyId,
      type_id: '2',
      specification: specificationString,
      name: propertyName
    };
  
    try {
      const response = await fetch('http://35.239.192.201:9092/api/line', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        },
        body: new URLSearchParams(payload).toString()
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating line/polygon:', error);
      throw new Error('An error occurred while creating line/polygon');
    }
  };
  

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: '10px',
          paddingY: '30px',
        }}
      >
        {/* Compass Image */}
        <Box sx={{ width: { xs: '100%', md: '50%', sm: "80%" }, padding: '20px' }}>
          {/* Textfield */}
          <CustomTextField label="Line Name" />
          {/* MUI Table */}
          <Table>
            <TableBody>
              {/* Row 1 */}
              <TableRow>
                <TableCell>
                  <SnowshoeingIcon sx={{ color: "#2465e9" }} />
                </TableCell>
                <TableCell sx={commonStyles}>Person detection</TableCell>
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
                  <DirectionsCarIcon sx={{ color: "#2465e9" }} />
                </TableCell>
                <TableCell sx={commonStyles}>Vehicle detection</TableCell>
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
                <TableCell sx={commonStyles}>Licence plate</TableCell>
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
            <CustomDropdown label="Zone Name">
              <Button px={3} color="primary" onClick={handleOpen} sx={commonStyles}>
                Add New Zone
              </Button>
              <MenuItem value={10}>Option 1</MenuItem>
              <MenuItem value={20}>Option 2</MenuItem>
              <MenuItem value={30}>Option 3</MenuItem>
            </CustomDropdown>
          </Box>

          <CustomButton onClick={createLinePolygon}>Save</CustomButton>

        </Box>
        {/* Drawing Canvas */}
        <Box
          width={{ xs: '100%', md: '50%', borderRadius: '10px' }}
          sx={{ position: 'relative' }}
        >
          <Stage
            width={600}
            height={418}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          >
            <Layer>
              {/* Background Image */}
              {image && (
                <KonvaImage
                  image={image}
                  width={600}
                  height={418}
                  listening={false}
                />
              )}

              {/* Polygons */}
              {polygons.map((polygon, polygonIndex) => (
                <Line
                  key={`polygon-${polygonIndex}`}
                  points={polygon.flatMap((line) => [line.start.x, line.start.y, line.end.x, line.end.y])}
                  stroke="red"
                  strokeWidth={2}
                  closed
                />
              ))}

              {/* Lines */}
              {lines.map((line, index) => (
                <Line
                  key={`line-${index}`}
                  points={[line.start.x, line.start.y, line.end.x, line.end.y]}
                  stroke="black"
                  strokeWidth={2}
                />
              ))}
            </Layer>
          </Stage>

          {/* Clear and Undo Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Button variant="contained" onClick={handleClear}>Clear</Button>
            {/* <Button variant="contained" onClick={handleUndo}>Undo</Button> */}
          </Box>
        </Box>
      </Box>

      {/* Dialog for adding new zone */}
      <Dialog open={open} onClose={handleClose}>
        <Typography backgroundColor=" #2465e9" color="white" borderRadius="5px 5px 0px 0px" p={2} sx={commonStyles}>
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
          <Typography width="500px" sx={commonStyles}>Zone Name</Typography>
          <TextField fullWidth size="small" id="outlined-basic" label="Enter view name here" variant="outlined" margin="dense" />
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CustomButton onClick={handleClose}>Back</CustomButton>
          <CustomButton onClick={handleClose}>Save</CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DrawOnImage;
