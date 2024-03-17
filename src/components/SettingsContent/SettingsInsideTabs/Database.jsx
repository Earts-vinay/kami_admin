import React, { useState,useCallback } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone';
import CustomButton from '../../CommonComponent/CustomButton';

const commonStyles = {
  fontFamily: "montserrat-regular",
};
const Database = () => {
  const [data, setData] = useState([
    { licensePlate: 'ABC123', notes: 'Some notes 1' },
    { licensePlate: 'XYZ789', notes: 'Some notes 2' },
    // Add more data as needed
  ]);

  
    const onDrop = useCallback((acceptedFiles) => {
        // Handle dropped files here
        console.log('Dropped Files:', acceptedFiles);
      }, []);
      const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };
  const handleAddDialog = () => {
   
    setAddDialog(true);
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleAddCloseDialog = () => {
    setAddDialog(false);
  };




  return (
    <>
     <Box display="flex" flexDirection="column" minHeight="80vh">
      <Box flexGrow={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={commonStyles}>License Plate</TableCell>
                <TableCell sx={commonStyles}>Notes</TableCell>
                <TableCell sx={commonStyles}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={commonStyles}>{item.licensePlate}</TableCell>
                  <TableCell sx={commonStyles}>{item.notes}</TableCell>
                  <TableCell >
             <Box sx={{display:'flex', gap:"10px"}}>     
      
             <img src="assets/icons/editicon.svg" alt="" width="35px" onClick={handleEdit} />
         
                  <img src="assets/icons/deleteicon.svg" alt="" width="35px" /></Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Box>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Typography backgroundColor=" #2465e9" sx={commonStyles} color="white" p={2}>Edit </Typography>
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
              onClick={handleCloseDialog}
            />
          <DialogContent sx={{width:"500px"}}>

            {selectedItem && (
              <>
                <div>
                <Typography fontSize="14px" sx={commonStyles} >Licence Plate ID</Typography>
              <TextField fullWidth size='small' id="outlined-basic" label="Id" margin="dense" variant="outlined"  />
                </div>
                <div>
                <Typography variant="body1" sx={commonStyles}>Notes</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              id="outlined-multiline"
              label="Notes"
              margin="dense"
              variant="outlined"
            />
                </div>
                {/* Add more fields as needed */}
              </>
            )}
          </DialogContent>
          <DialogActions  sx={{display:"flex", justifyContent:"center"}}>
          <CustomButton  onClick={handleCloseDialog}>Cancel</CustomButton>
            <CustomButton>Save</CustomButton>
          </DialogActions>
        </Dialog>

       <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        <CustomButton onClick={handleAddDialog} >Add</CustomButton>
       </Box>

        {/* Add Dialog */}
        <Dialog open={addDialog} onClose={handleAddCloseDialog}>
        <Typography backgroundColor=" #2465e9" color="white" p={2} sx={commonStyles}>Add view</Typography>
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
              onClick={handleAddCloseDialog}
            />
          <DialogContent sx={{width:"500px"}}>
          <Typography fontSize="14px" sx={commonStyles}>Licence Plate ID</Typography>
              <TextField fullWidth size='small' id="outlined-basic" label="Id" margin="dense" variant="outlined"  />
              <Typography variant="body1" sx={commonStyles}>Notes</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              id="outlined-multiline"
              label="Notes"
              margin="dense"
              variant="outlined"
            />

            <Typography textAlign="center" my={2} sx={commonStyles}>OR</Typography>
            <Box sx={{ background: '#E3EBFC', padding: '20px',borderRadius:"10px" }}>
        <div {...getRootProps()} style={{ cursor: 'pointer', marginTop: '5px',display:"flex",alignItems:"center",gap:"20px",flexDirection:"column" }}>
          <input {...getInputProps()} />
          <img src="assets/icons/uploadicon.svg" alt="" />   
         <Typography sx={{color:'#2465e9',...commonStyles}} >Bulk Upload</Typography>
        </div>
     </Box>
          </DialogContent>
          <DialogActions sx={{display:"flex", justifyContent:"center"}}>
            <CustomButton  onClick={handleAddCloseDialog}>Cancel</CustomButton>
            <CustomButton>Save</CustomButton>
          </DialogActions>
        </Dialog>
    
      </Box>
    </>
  );
};

export default Database;
