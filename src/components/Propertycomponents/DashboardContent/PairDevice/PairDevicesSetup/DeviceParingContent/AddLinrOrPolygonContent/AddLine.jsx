// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableRow from '@mui/material/TableRow';
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import SnowshoeingIcon from "@mui/icons-material/Snowshoeing";
// import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
// import { styled } from '@mui/material/styles';
// import CustomButton from '../../../../../../CommonComponent/CustomButton';
// import { Stage, Layer, Line } from 'react-konva';

// const commonStyles = {
//   fontFamily: "montserrat-regular",
// }; 
// const AntSwitch = styled(Switch)(({ theme }) => ({
//   width: 28,
//   height: 16,
//   padding: 0,
//   display: 'flex',
//   '&:active': {
//     '& .MuiSwitch-thumb': {
//       width: 15,
//     },
//     '& .MuiSwitch-switchBase.Mui-checked': {
//       transform: 'translateX(9px)',
//     },
//   },
//   '& .MuiSwitch-switchBase': {
//     padding: 2,
//     '&.Mui-checked': {
//       transform: 'translateX(12px)',
//       color: '#fff',
//       '& + .MuiSwitch-track': {
//         opacity: 1,
//         backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
//       },
//     },
//   },
//   '& .MuiSwitch-thumb': {
//     boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     transition: theme.transitions.create(['width'], {
//       duration: 200,
//     }),
//   },
//   '& .MuiSwitch-track': {
//     borderRadius: 16 / 2,
//     opacity: 1,
//     backgroundColor:
//       theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
//     boxSizing: 'border-box',
//   },
// }));

// const AddLine = () => {
//   const [open, setOpen] = useState(false); // State to manage the dialog

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const [polygonPoints, setPolygonPoints] = useState([]);

//   const handleMouseDown = (event) => {
//     const pos = event.target.getStage().getPointerPosition();
//     setPolygonPoints([...polygonPoints, pos.x, pos.y]);
//   };

//   const handleMouseMove = (event) => {
//     if (event.evt.buttons === 1) {
//       const pos = event.target.getStage().getPointerPosition();
//       const updatedPoints = [...polygonPoints, pos.x, pos.y];
//       // Ensure that each pair of points creates a straight line segment
//       const straightPoints = [];
//       for (let i = 0; i < updatedPoints.length - 2; i += 2) {
//         const x1 = updatedPoints[i];
//         const y1 = updatedPoints[i + 1];
//         const x2 = updatedPoints[i + 2];
//         const y2 = updatedPoints[i + 3];
//         straightPoints.push(x1, y1, x2, y2);
//       }
//       setPolygonPoints(straightPoints);
//     }
//   };

//   const handleClear = () => {
//     setPolygonPoints([]);
//   };

//   const handleUndo = () => {
//     if (polygonPoints.length > 0) {
//       const updatedPoints = polygonPoints.slice(0, -2);
//       setPolygonPoints(updatedPoints);
//     }
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: { xs: 'column', md: 'row' }, // Column layout on small screens, row layout on medium screens and above
//           gap: '10px',
//           paddingY: '30px',
//         }}
//       >
//         {/* Compass Image */}
//         <Box sx={{ width: { xs: '100%', md: '50%', sm: "80%" }, padding: '20px' }}>
//           {/* Textfield */}
//           <Typography sx={commonStyles}> Line Name</Typography>
//           <TextField label="Line Name" variant="outlined" size="small" fullWidth margin="dense" />

//           {/* MUI Table */}
//           <Table>
//             <TableBody>
//               {/* Row 1 */}
//               <TableRow>
//                 <TableCell>
//                   <SnowshoeingIcon sx={{ color: "#2465e9" }} />
//                 </TableCell>
//                 <TableCell sx={commonStyles}>Person detection</TableCell>
//                 <TableCell>
//                   <AntSwitch
//                     defaultChecked={"on"}
//                     inputProps={{ 'aria-label': 'Raise Alerts' }}
//                   />
//                 </TableCell>
//               </TableRow>
//               {/* Row 2 */}
//               <TableRow>
//                 <TableCell>
//                   <DirectionsCarIcon sx={{ color: "#2465e9" }} />
//                 </TableCell>
//                 <TableCell sx={commonStyles}>Vehicle detection</TableCell>
//                 <TableCell>
//                   <AntSwitch
//                     defaultChecked={"on"}
//                     inputProps={{ 'aria-label': 'Raise Alerts' }}
//                   />
//                 </TableCell>
//               </TableRow>
//               {/* Row 3 */}
//               <TableRow>
//                 <TableCell>
//                   <img src="assets/icons/licenceplate.svg" alt="Plate Icon" />
//                 </TableCell>
//                 <TableCell sx={commonStyles}>Licence plate</TableCell>
//                 <TableCell>
//                   <AntSwitch
//                     defaultChecked={"on"}
//                     inputProps={{ 'aria-label': 'Raise Alerts' }}
//                   />
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>

//           {/* MUI Dropdown */}
//           <Box py={3}>
//             <Typography sx={commonStyles}> Zone Name</Typography>
//             <TextField label="Zone Name" select fullWidth margin="dense" size="small">
//               <Button px={3} color="primary" onClick={handleOpen} sx={commonStyles}>
//                 Add New Zone
//               </Button>
//               <MenuItem value={10}>Option 1</MenuItem>
//               <MenuItem value={20}>Option 2</MenuItem>
//               <MenuItem value={30}>Option 3</MenuItem>
//             </TextField>
//           </Box>
//         </Box>

//         {/* Image */}
//         {/* Image Box */}
//         <Box
//           width={{ xs: '100%', md: '50%', borderRadius: '10px' }}
//           sx={{ position: 'relative' }}
//         >
//           <img
//             src="assets/images/deviceview.png"
//             alt="Device View"
//             width="100%"
//             borderRadius="10px"
//           />
//           <Stage
//             width={600} // Adjust according to your image dimensions
//             height={418} // Adjust according to your image dimensions
//             onMouseDown={handleMouseDown}
//             onMouseMove={handleMouseMove}
//             style={{ position: 'absolute', top: 0, left: 0 }}
//           >
//             <Layer>
//               <Line
//                 points={polygonPoints}
//                 stroke="blue"
//                 strokeWidth={2}
//               />
//             </Layer>
//           </Stage>

//           {/* Clear and Undo buttons */}
//           <Box
//           sx={{
//             position: 'absolute',
//             bottom: '10px',
//             right: '10px',
//           }}
//         >
//         <IconButton
//   sx={{
//     color: 'white',
//     backgroundColor: 'red',
//     borderRadius: '5px',
//     height: '24px', // Adjust height as needed
//     fontSize: '12px', // Adjust font size as needed
//   }}
//   onClick={handleClear}
// >
// X</IconButton>
// <IconButton
//   sx={{
//     color: 'white',
//     backgroundColor: 'blue',
//     borderRadius: '5px',
//     height: '24px', // Adjust height as needed
//     fontSize: '12px', // Adjust font size as needed
//   }}
//   onClick={handleUndo}
// >
//   Undo
// </IconButton>

//         </Box>
//         </Box>
//       </Box>

//       {/* Dialog for adding new zone */}
//       <Dialog open={open} onClose={handleClose}>
//         <Typography backgroundColor=" #2465e9" color="white" borderRadius="5px 5px 0px 0px" p={2} sx={commonStyles}>
//           Add New Zone
//         </Typography>
//         <CloseIcon
//           sx={{
//             position: 'absolute',
//             top: 0,
//             right: 0,
//             color: 'white',
//             cursor: 'pointer',
//             paddingY: '6px',
//             paddingX: '10px',
//           }}
//           onClick={handleClose}
//         />
//         <DialogContent>
//           <Typography width="500px" sx={commonStyles}>Zone Name</Typography>
//           <TextField fullWidth size="small" id="outlined-basic" label="Enter view name here" variant="outlined" margin="dense" />
//         </DialogContent>
//         <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <CustomButton onClick={handleClose}>Back</CustomButton>
//           <CustomButton onClick={handleClose}>Save</CustomButton>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default AddLine;

// import React, { useState } from 'react';
// import { Stage, Layer, Line } from 'react-konva';


// const SelectUsingLines = () => {
//   const [lines, setLines] = useState([]);

//   const handleMouseDown = (e) => {
//     const point = e.target.getStage().getPointerPosition();
//     setLines([...lines, { start: point, end: point }]);
//   };

//   const handleMouseMove = (e) => {
//     if (lines.length > 0) {
//       const point = e.target.getStage().getPointerPosition();
//       const updatedLines = [...lines];
//       updatedLines[lines.length - 1].end = point;
//       setLines(updatedLines);
//     }
//   };

//   return (
//     <div>
  
//       <Stage
//         width={window.innerWidth}
//         height={window.innerHeight}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//       >
//         <Layer>
//           {lines.map((line, index) => (
//             <Line
//               key={index}
//               points={[line.start.x, line.start.y, line.end.x, line.end.y]}
//               stroke="black"
//               strokeWidth={2}
//             />
//           ))}
//         </Layer>
//       </Stage>
//     </div>
//   );
// };

// export default SelectUsingLines;

// import React, { useState } from 'react';
// import { Stage, Layer, Line } from 'react-konva';

// const SelectUsingLines = () => {
//   const [lines, setLines] = useState([]);
//   const [polygons, setPolygons] = useState([]);

//   const handleMouseDown = (e) => {
//     const point = e.target.getStage().getPointerPosition();
//     let updatedLines = [...lines];

//     // Check if there are at least two points to form a line
//     if (updatedLines.length > 0) {
//       // Check if the distance to the first point is small enough to close the polygon
//       const distance = Math.sqrt(
//         Math.pow(point.x - updatedLines[0].start.x, 2) +
//         Math.pow(point.y - updatedLines[0].start.y, 2)
//       );

//       if (distance < 10) {
//         // Close the polygon by setting the last point to the first point
//         updatedLines[updatedLines.length - 1].end = updatedLines[0].start;
//         setPolygons([...polygons, updatedLines]);
//         updatedLines = [];
//       }
//     }

//     setLines([...updatedLines, { start: point, end: point }]);
//   };

//   const handleMouseMove = (e) => {
//     if (lines.length > 0) {
//       const point = e.target.getStage().getPointerPosition();
//       const updatedLines = [...lines];
//       updatedLines[lines.length - 1].end = point;
//       setLines(updatedLines);
//     }
//   };

//   return (
//     <div>
//       <Stage
//         width={window.innerWidth}
//         height={window.innerHeight}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//       >
//         <Layer>
//           {/* Render lines */}
//           {lines.map((line, index) => (
//             <Line
//               key={`line-${index}`}
//               points={[line.start.x, line.start.y, line.end.x, line.end.y]}
//               stroke="black"
//               strokeWidth={2}
//             />
//           ))}

//           {/* Render polygons */}
//           {polygons.map((polygon, polygonIndex) => (
//             <Line
//               key={`polygon-${polygonIndex}`}
//               points={polygon.flatMap((line) => [line.start.x, line.start.y, line.end.x, line.end.y])}
//               stroke="red"
//               strokeWidth={2}
//               closed
//             />
//           ))}
//         </Layer>
//       </Stage>
//     </div>
//   );
// };

// export default SelectUsingLines;




// import React, { useState } from 'react';
// import { Stage, Layer, Line } from 'react-konva';

// const SelectUsingLines = () => {
//   const [lines, setLines] = useState([]);
//   const [polygons, setPolygons] = useState([]);
//   const [drawingAllowed, setDrawingAllowed] = useState(true);
//   const [showOptions, setShowOptions] = useState(true);

//   const handleMouseDown = (e) => {
//     if (!drawingAllowed) return;

//     const point = e.target.getStage().getPointerPosition();
//     let updatedLines = [...lines];

//     // Check if there are at least two points to form a line
//     if (updatedLines.length > 0) {
//       // Check if the distance to the first point is small enough to close the polygon
//       const distance = Math.sqrt(
//         Math.pow(point.x - updatedLines[0].start.x, 2) +
//         Math.pow(point.y - updatedLines[0].start.y, 2)
//       );

//       if (distance < 10) {
//         // Close the polygon by setting the last point to the first point
//         updatedLines[updatedLines.length - 1].end = updatedLines[0].start;
//         setPolygons([...polygons, updatedLines]);
//         updatedLines = [];
//         setDrawingAllowed(false); // Stop drawing when polygon is closed
//         setShowOptions(false); // Hide options after closing polygon
//       }
//     }

//     setLines([...updatedLines, { start: point, end: point }]);
//   };

//   const handleMouseMove = (e) => {
//     if (lines.length > 0 && drawingAllowed) {
//       const point = e.target.getStage().getPointerPosition();
//       const updatedLines = [...lines];
//       const startPoint = updatedLines[0].start;

//       // Check if the distance to the start point is small enough to stop drawing
//       const distance = Math.sqrt(
//         Math.pow(point.x - startPoint.x, 2) +
//         Math.pow(point.y - startPoint.y, 2)
//       );

//       if (distance >= 10) {
//         updatedLines[lines.length - 1].end = point;
//         setLines(updatedLines);
//       }
//     }
//   };

//   return (
//     <div style={{ pointerEvents: !drawingAllowed ? 'none' : 'auto' }}>
//       <Stage
//         width={window.innerWidth}
//         height={window.innerHeight}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={() => setDrawingAllowed(true)} // Enable drawing after mouse up
//       >
//         <Layer>
//           {/* Render lines */}
//           {lines.map((line, index) => (
//             <Line
//               key={`line-${index}`}
//               points={[line.start.x, line.start.y, line.end.x, line.end.y]}
//               stroke="black"
//               strokeWidth={2}
//             />
//           ))}

//           {/* Render polygons */}
//           {polygons.map((polygon, polygonIndex) => (
//             <Line
//               key={`polygon-${polygonIndex}`}
//               points={polygon.flatMap((line) => [line.start.x, line.start.y, line.end.x, line.end.y])}
//               stroke="red"
//               strokeWidth={2}
//               closed
//             />
//           ))}
//         </Layer>
//       </Stage>
//       {showOptions && (
//         <div>
//           {/* Additional drawing controls can be placed here */}
//           <button onClick={() => console.log('Draw line')}>Draw Line</button>
//           <button onClick={() => console.log('Select line')}>Select Line</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectUsingLines;


import React, { useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';

const SelectUsingLines = () => {
  const [lines, setLines] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [drawingAllowed, setDrawingAllowed] = useState(true);
  const [showOptions, setShowOptions] = useState(true);
  const [newPolygon, setNewPolygon] = useState(false); // Flag to indicate starting a new polygon

  const handleMouseDown = (e) => {
    if (!drawingAllowed) return;

    const point = e.target.getStage().getPointerPosition();
    let updatedLines = [...lines];

    // Check if a new polygon is being started
    if (newPolygon) {
      setLines([]); // Reset lines for the new polygon
      setPolygons([...polygons, updatedLines]); // Save the completed polygon
      setShowOptions(false); // Hide options for the new polygon
      setNewPolygon(false); // Reset the new polygon flag
    }

    // Check if there are at least two points to form a line
    if (updatedLines.length > 0) {
      // Check if the distance to the first point is small enough to close the polygon
      const distance = Math.sqrt(
        Math.pow(point.x - updatedLines[0].start.x, 2) +
        Math.pow(point.y - updatedLines[0].start.y, 2)
      );

      if (distance < 10) {
        // Close the current polygon by setting the last point to the first point
        updatedLines[updatedLines.length - 1].end = updatedLines[0].start;
        setPolygons([...polygons, updatedLines]);
        updatedLines = [];
        setDrawingAllowed(false); // Stop drawing when polygon is closed
        setShowOptions(true); // Show options for the next polygon
        setNewPolygon(true); // Set the new polygon flag to true
        return; // Exit the function to prevent further drawing
      }
    }

    setLines([...updatedLines, { start: point, end: point }]);
  };

  const handleMouseMove = (e) => {
    if (lines.length > 0 && drawingAllowed) {
      const point = e.target.getStage().getPointerPosition();
      const updatedLines = [...lines];
      const startPoint = updatedLines[0].start;

      // Check if the distance to the start point is small enough to stop drawing
      const distance = Math.sqrt(
        Math.pow(point.x - startPoint.x, 2) +
        Math.pow(point.y - startPoint.y, 2)
      );

      if (distance >= 10) {
        updatedLines[lines.length - 1].end = point;
        setLines(updatedLines);
      }
    }
  };

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setDrawingAllowed(true)} // Enable drawing after mouse up
      >
        <Layer>
          {/* Render lines */}
          {lines.map((line, index) => (
            <Line
              key={`line-${index}`}
              points={[line.start.x, line.start.y, line.end.x, line.end.y]}
              stroke="black"
              strokeWidth={2}
            />
          ))}

          {/* Render polygons */}
          {polygons.map((polygon, polygonIndex) => (
            <Line
              key={`polygon-${polygonIndex}`}
              points={polygon.flatMap((line) => [line.start.x, line.start.y, line.end.x, line.end.y])}
              stroke="red"
              strokeWidth={2}
              closed
            />
          ))}
        </Layer>
      </Stage>
      {showOptions && (
        <div>
          {/* Additional drawing controls can be placed here */}
          <button onClick={() => console.log('Draw line')}>Draw Line</button>
          <button onClick={() => console.log('Select line')}>Select Line</button>
        </div>
      )}
    </div>
  );
};

export default SelectUsingLines;
