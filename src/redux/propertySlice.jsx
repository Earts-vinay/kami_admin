import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  selectedProperty: null,
  settings: null,
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setSelectedProperty(state, action) {
      state.selectedProperty = action.payload;
    },
    setSettings(state, action) {
      state.settings = action.payload;
    },
  },
});

export const { setSelectedProperty, setSettings } = propertySlice.actions;

export default propertySlice.reducer;