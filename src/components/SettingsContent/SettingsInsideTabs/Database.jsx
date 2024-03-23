import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDropzone } from "react-dropzone";
import CustomButton from "../../CommonComponent/CustomButton";
import { useSelector } from "react-redux";
import { selectToken } from "../../../redux/apiResponse/loginApiSlice";
import axios from "axios";
import blackListSchema from "../../../utils/blackListSchema";
import { useFormik } from "formik";
const commonStyles = {
  fontFamily: "montserrat-regular",
};
const BaseUrl = process.env.REACT_APP_API_URL;
const getBlackListData = (token, propertyId, setData) => {
  const url = `${BaseUrl}blacklist/plate`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  axios
    .get(url, { headers: headers })
    .then((response) => {
      const { msg, data } = response.data;
      console.log(data.list);
      if (msg === "ok") {
        const filteredData = data?.list?.filter(
          (item) => item.property_id === Number(propertyId)
        );
        setData(filteredData);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
const Database = ({ propertyId }) => {
  const token = useSelector(selectToken);
  const [data, setData] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    console.log("Dropped Files:", acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

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
  const handleDeleteCloseDialog = () => {
    setDeleteDialog(false);
  };
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    values,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      property_id: propertyId,
      license_plate: "",
      remark: "",
    },
    validationSchema: blackListSchema,
    onSubmit: (values) => {
      console.log(values);
      const url = `${BaseUrl}blacklist/plate`;
      const data = new URLSearchParams(values);
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      };

      // Making the POST request using Axios
      axios
        .post(url, data, { headers: headers })
        .then((response) => {
          console.log(response.data);
          resetForm();
          setAddDialog(false);
          getBlackListData(token, propertyId, setData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  });
  useEffect(() => {
    getBlackListData(token, propertyId, setData);
  }, [propertyId]);

  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="80vh">
        <Box flexGrow={1}>
          {data.length > 0 ? (
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
                      <TableCell sx={commonStyles}>
                        {item.license_plate}
                      </TableCell>
                      <TableCell sx={commonStyles}>{item.remark}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: "10px" }}>
                          <img
                            src="https://hatimi.s3.amazonaws.com/kamiWebsite/editicon.svg"
                            alt=""
                            width="35px"
                            onClick={() => {
                              handleEdit(item);
                            }}
                          />

                          <img
                            src="https://hatimi.s3.amazonaws.com/kamiWebsite/deleteicon.svg"
                            alt=""
                            width="35px"
                            onClick={() => {
                              setDeleteDialog(true);
                              setSelectedItem(item);
                            }}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div>No Data Found for this property</div>
          )}
        </Box>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <Typography
            backgroundColor=" #2465e9"
            sx={commonStyles}
            color="white"
            p={2}
          >
            Edit{" "}
          </Typography>
          <CloseIcon
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "white",
              cursor: "pointer",
              paddingY: "6px",
              paddingX: "10px",
            }}
            onClick={handleCloseDialog}
          />
          <DialogContent sx={{ width: "500px" }}>
            {selectedItem && (
              <>
                <div>
                  <Typography fontSize="14px" sx={commonStyles}>
                    Licence Plate ID
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    id="outlined-basic"
                    margin="dense"
                    variant="outlined"
                    value={selectedItem?.license_plate}
                    onChange={(e) => {
                      setSelectedItem({
                        ...selectedItem,
                        license_plate: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <Typography variant="body1" sx={commonStyles}>
                    Notes
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    id="outlined-multiline"
                    margin="dense"
                    variant="outlined"
                    value={selectedItem?.remark}
                    onChange={(e) => {
                      setSelectedItem({
                        ...selectedItem,
                        remark: e.target.value,
                      });
                    }}
                  />
                </div>
                {/* Add more fields as needed */}
              </>
            )}
          </DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <CustomButton onClick={handleCloseDialog}>Cancel</CustomButton>
            <CustomButton
              onClick={() => {
                if (
                  selectedItem.license_plate !== "" &&
                  selectedItem.property_id
                ) {
                  const url = `${BaseUrl}blacklist/plate/${selectedItem.id}`;
                  const data = new URLSearchParams(selectedItem);
                  const headers = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                  };

                  // Making the PUT request using Axios
                  axios
                    .put(url, data, { headers: headers })
                    .then((response) => {
                      console.log(response.data);
                      setOpenDialog(false);
                      getBlackListData(token, propertyId, setData);
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                }
              }}
            >
              Update
            </CustomButton>
          </DialogActions>
        </Dialog>

        <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
          <CustomButton onClick={handleAddDialog}>Add</CustomButton>
        </Box>

        {/* Add Dialog */}
        <Dialog open={addDialog} onClose={handleAddCloseDialog}>
          <form onSubmit={handleSubmit}>
            <Typography
              backgroundColor=" #2465e9"
              color="white"
              p={2}
              sx={commonStyles}
            >
              Add view
            </Typography>
            <CloseIcon
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                color: "white",
                cursor: "pointer",
                paddingY: "6px",
                paddingX: "10px",
              }}
              onClick={handleAddCloseDialog}
            />
            <DialogContent sx={{ width: "500px" }}>
              <Typography fontSize="14px" sx={commonStyles}>
                Licence Plate ID
              </Typography>
              <TextField
                type="text"
                name="license_plate"
                fullWidth
                size="small"
                id="outlined-basic"
                label="Id"
                margin="dense"
                variant="outlined"
                value={values.license_plate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.license_plate && touched.license_plate ? (
                <div>{errors.license_plate}</div>
              ) : null}
              <Typography variant="body1" sx={commonStyles}>
                Notes
              </Typography>
              <TextField
                type="text"
                fullWidth
                multiline
                rows={4}
                id="outlined-multiline"
                label="Notes"
                margin="dense"
                name="remark"
                variant="outlined"
                value={values.remark}
                onChange={handleChange}
              />

              <Typography textAlign="center" my={2} sx={commonStyles}>
                OR
              </Typography>
              <Box
                sx={{
                  background: "#E3EBFC",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <div
                  {...getRootProps()}
                  style={{
                    cursor: "pointer",
                    marginTop: "5px",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    flexDirection: "column",
                  }}
                >
                  <input {...getInputProps()} />
                  <img src="assets/icons/uploadicon.svg" alt="" />
                  <Typography sx={{ color: "#2465e9", ...commonStyles }}>
                    Bulk Upload
                  </Typography>
                </div>
              </Box>
            </DialogContent>
            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
              <CustomButton onClick={handleAddCloseDialog}>Cancel</CustomButton>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        {/*delete dialog*/}
        <Dialog open={deleteDialog} onClose={handleDeleteCloseDialog}>
          <Typography
            backgroundColor=" #2465e9"
            color="white"
            borderRadius="5px 5px 0px 0px"
            p={2}
            sx={commonStyles}
          >
            Delete User
          </Typography>
          <CloseIcon
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "white",
              cursor: "pointer",
              paddingY: "6px",
              paddingX: "10px",
            }}
            onClick={handleDeleteCloseDialog}
          />
          <DialogContent>
            <Typography width="500px" sx={commonStyles}>
              Please Confirm to Delete user
            </Typography>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomButton onClick={handleDeleteCloseDialog}>
              Cancel
            </CustomButton>
            <CustomButton
              onClick={() => {
                if (selectedItem.id) {
                  const url = `${BaseUrl}blacklist/plate`;
                  const data = new URLSearchParams({
                    id: selectedItem.id,
                  });
                  const headers = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                  };

                  // Making the DELETE request using Axios
                  axios
                    .delete(url, { data: data, headers: headers })
                    .then((response) => {
                      console.log(response.data);
                      setDeleteDialog(false);
                      getBlackListData(token, propertyId, setData);
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                }
              }}
            >
              Delete
            </CustomButton>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Database;
