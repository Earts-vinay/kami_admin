// store.js
import { configureStore } from '@reduxjs/toolkit';
import { sideNavSlice } from './sidenav/sidenavSlice';

 const store = configureStore({
  reducer: {
    sideNav: sideNavSlice.reducer, // Use sideNavSlice.reducer here
  },
});

export default store;

