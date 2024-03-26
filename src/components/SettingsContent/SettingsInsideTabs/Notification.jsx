import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, Checkbox, FormControlLabel, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from '../../CommonComponent/CustomButton';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import CustomTextField from '../../CommonComponent/CustomTextField';
import { AddNoticeApiResponse } from '../../../redux/apiResponse/addnoticeSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { selectToken } from '../../../redux/apiResponse/loginApiSlice';
import { fetchDataStart, fetchDataSuccess, fetchDataFailure, selectResponseData, selectLoading, selectError } from '../../../redux/apiResponse/noticeSlice'
import dayjs from 'dayjs';
const BaseUrl = process.env.REACT_APP_API_URL
const commonStyles = {
  fontFamily: "montserrat-regular",
};
const Notification = ({ propertyId }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [roleName, setRoleName] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [emailChecked, setEmailChecked] = useState(false);
  const [smsChecked, setSmsChecked] = useState(false);

  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleDayClick = (day) => {
    setSelectedDay(day === selectedDay ? '' : day);
  };

  const handleSaveNotification = async () => {
    const formData = new URLSearchParams();
    formData.append('property_id', propertyId);
    formData.append('analytics_type_id', 2);
    formData.append('name', roleName);
    formData.append('week_day', selectedDay);
    formData.append('start_time', startTime);
    formData.append('end_time', endTime);
    formData.append('is_email', emailChecked ? 1 : 0);
    formData.append('is_sms', smsChecked ? 1 : 0);
    formData.append('recevier_user_id', 3);
    // console.log('Notification saved:', { roleName, dayOfWeek, startTime, endTime, emailChecked, smsChecked });

    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      };

      const response = await axios.post(`${BaseUrl}setting/notice`, formData, { headers });

      const data = response.data;
      console.log("notice", data);

      dispatch(AddNoticeApiResponse(data));

      if (data.code === 200) {
        navigate(``);
        toast.success('Notice saved successfully!');
      }
    } catch (error) {
      console.error('Error saving notice:', error);
      toast.error('An error occurred while saving notice!');
    }
    handleClose();
  };

  const [responseData, setResponseData] = useState(null);
  // console.log(responseData);

  useEffect(() => {
    try {
      const payload = new URLSearchParams({
        page: 1,
        limit: 20,
      });

      const headers = {
        'Authorization': `Bearer ${token}`
      };

      axios.get(`${BaseUrl}setting/notice`, { headers, params: payload })
        .then((res) => {
          const { data } = res.data;

          if (res.data.code === 200) {
            setResponseData(data);
            toast.success(data.msg);
          } else {
            toast.error(data.msg);
          }
        })
        .catch((err) => {
          console.error('Error:', err);
          toast.error('An error occurred while fetching data');
        });
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while fetching data');
    }
  }, []);

  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="80vh" overflow="auto">
        <Box flexGrow={1}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={commonStyles}>Rule Type</TableCell>
                  <TableCell sx={commonStyles}>Location</TableCell>
                  <TableCell sx={commonStyles}>Schedule</TableCell>
                  <TableCell sx={commonStyles}>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {responseData && responseData.list.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell sx={commonStyles}>{notification.name}</TableCell>
                  <TableCell sx={commonStyles}>{notification.property_name}</TableCell>
                  <TableCell sx={commonStyles}>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {notification.days_of_week.split(',').map((day) => (
                        <Button key={day} variant="contained" color="primary" style={{ borderRadius: '50%', minWidth: '36px', height: '36px', padding: '0', textTransform: 'capitalize' }}>
                          {day}
                        </Button>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell sx={commonStyles}>{`${notification.start_time} - ${notification.end_time}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </TableContainer>
        </Box>


        <Box textAlign="center" marginTop={2}>
          <CustomButton onClick={handleOpen}>Add</CustomButton>
        </Box>

        <Dialog open={open} onClose={handleClose} sx={{ borderRadius: "5px" }}>
          <Typography backgroundColor=" #2465e9" color="white" borderRadius="5px 5px 0px 0px" p={2} sx={commonStyles}>
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
            <CustomTextField label="Rule Name" value={roleName} onChange={(e) => setRoleName(e.target.value)} />

            <Box py={1}>
              <Typography pb={1} sx={commonStyles}>Day of Week</Typography>
              <Box display="flex" gap={1} alignItems="center" marginBottom="8px">
                {['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'].map((day) => (
                  <Button
                    key={day}
                    variant={day === selectedDay ? "contained" : "outlined"}
                    color="primary"
                    style={{ borderRadius: '50%', minWidth: '36px', height: '36px', padding: '0', textTransform: "capitalize" }}
                    onClick={() => handleDayClick(day)}
                  >
                    {day}
                  </Button>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: "10px" }}>
              {/* <Box>
              <Typography sx={commonStyles}>Start Time</Typography>
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
              <Typography sx={commonStyles}>End Time</Typography>
              <TextField
                label="End Time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                fullWidth
                margin="dense"
                size="small"
              />
            </Box> */}


              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Start Time"
                    value={startTime ? dayjs(startTime, 'HH:mm:ss') : null}
                    onChange={(newValue) => setStartTime(newValue ? newValue.format('HH:mm:ss') : null)}
                    fullWidth
                    margin="dense"
                    size="small"
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                  />
                </LocalizationProvider>
              </Box>




              {/* End Time TimePicker */}
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="End Time"
                    value={endTime ? dayjs(endTime, 'HH:mm:ss') : null}
                    onChange={(newValue) => setEndTime(newValue ? newValue.format('HH:mm:ss') : null)}
                    fullWidth
                    margin="dense"
                    size="small"
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                  />
                </LocalizationProvider>
              </Box>

            </Box>
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Box py={1}>
                <Typography sx={commonStyles}>Receivers</Typography>
                <TextField
                  label={emailChecked ? "Email" : "SMS"}
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  size="small"
                  sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#2465E9' } } }}
                />
              </Box>
              <Box pt={3}>
                <FormControlLabel
                  control={<Checkbox checked={emailChecked} onChange={(e) => {
                    setEmailChecked(e.target.checked);
                    if (e.target.checked) {
                      setSmsChecked(false);
                    }
                  }} />}
                  label="Email"
                />
                <FormControlLabel
                  control={<Checkbox checked={smsChecked} onChange={(e) => {
                    setSmsChecked(e.target.checked);
                    if (e.target.checked) {
                      setEmailChecked(false);
                    }
                  }} />}
                  label="SMS"
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <CustomButton >Cancel</CustomButton>
              <CustomButton onClick={handleSaveNotification}>Save</CustomButton>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default Notification;
