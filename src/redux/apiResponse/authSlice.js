import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null
  },
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    setAuthenticationError: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    clearAuthentication: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    }
  }
});

export const { setAuthentication, setAuthenticationError, clearAuthentication } = authSlice.actions;

export const selectAuthentication = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectAuthenticationError = (state) => state.auth.error;

export default authSlice.reducer;
