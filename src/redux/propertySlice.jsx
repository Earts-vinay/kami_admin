import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedProperty: null,
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setSelectedProperty(state, action) {
      state.selectedProperty = action.payload;
    },
  },
});

export const { setSelectedProperty } = propertySlice.actions;

export default propertySlice.reducer;
