// deviceSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  devices: [],
  selectedPoleId: null,
  selectedCameraId: null,
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDevices(state, action) {
      state.devices = action.payload;
    },
    setPoleAndCameraIds(state, action) {
      const { poleId, cameraId } = action.payload;
      state.selectedPoleId = poleId;
      state.selectedCameraId = cameraId;
    },
  },
});

export const { setDevices, setPoleAndCameraIds } = deviceSlice.actions;

export const selectDevices = state => state.device.devices;
export const selectSelectedPoleId = state => state.device.selectedPoleId;
export const selectSelectedCameraId = state => state.device.selectedCameraId;

export default deviceSlice.reducer;
