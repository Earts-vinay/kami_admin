// sideNavSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const sideNavSlice = createSlice({
  name: 'sideNav',
  initialState: {
    isOpen: true,
  },
  reducers: {
    toggleSideNav: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleSideNav } = sideNavSlice.actions;

export const selectIsSideNavOpen = (state) => state.sideNav.isOpen;

export default sideNavSlice.reducer;
