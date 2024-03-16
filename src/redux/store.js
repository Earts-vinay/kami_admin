// store.js
import { configureStore } from '@reduxjs/toolkit';
import { sideNavSlice } from './sidenav/sidenavSlice';
import loginApiReducer from '../redux/apiResponse/loginApiSlice';
import authReducer from '../redux/apiResponse/authSlice';
import dictionaryReducer from '../redux/apiResponse/dictionarySlice';

 const store = configureStore({
  reducer: {
    sideNav: sideNavSlice.reducer, 
    loginApi: loginApiReducer,
    auth: authReducer,
    dictionary: dictionaryReducer,
  },
});

export default store;

