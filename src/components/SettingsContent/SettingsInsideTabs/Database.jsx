import React, { useState,useCallback } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone';

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
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>License Plate</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.licensePlate}</TableCell>
                  <TableCell>{item.notes}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(item)}>Edit</Button>
                    <Button onClick={() => handleDelete(index)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogContent>
            {/* Add form fields here for editing */}
            {/* For example: */}
            {selectedItem && (
              <>
                <div>License Plate: {selectedItem.licensePlate}</div>
                <div>Notes: {selectedItem.notes}</div>
                {/* Add more fields as needed */}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>

       <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
       <Button onClick={handleAddDialog} variant="contained" textAlign="center">Add</Button>
       </Box>

        {/* Add Dialog */}
        <Dialog open={addDialog} onClose={handleAddCloseDialog}>
        <Typography backgroundColor=" #2465e9" color="white" p={2}>Add view</Typography>
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
          <Typography fontSize="14px" >Licence Plate ID</Typography>
              <TextField fullWidth size='small' id="outlined-basic" label="Id" margin="dense" variant="outlined"  />

              <Typography variant="body1">Notes</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              id="outlined-multiline"
              label="Notes"
              margin="dense"
              variant="outlined"
            />

            <Typography textAlign="center" my={2}>OR</Typography>

            <Box sx={{ background: '#E3EBFC', padding: '20px',borderRadius:"10px" }}>
        <div {...getRootProps()} style={{ cursor: 'pointer', marginTop: '5px',display:"flex",alignItems:"center",gap:"20px",flexDirection:"column" }}>
          <input {...getInputProps()} />
          <img src="assets/icons/uploadicon.svg" alt="" />
     
         <Typography sx={{color:'#2465e9'}}>Bulk Upload</Typography>
         
         
        </div>
     </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Database;
