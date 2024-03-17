import { createSlice } from '@reduxjs/toolkit';

export const loginApiSlice = createSlice({
  name: 'loginApi',
  initialState: { token: sessionStorage.getItem('token') || null, user: null, error: null },
  reducers: {
    setLoginApiResponse: (state, action) => {
      const { code, data, msg } = action.payload;
      if (code === 200) {
        state.token = data.token;
        state.user = data.user;
        state.error = null;
        sessionStorage.setItem('token', data.token);
      } else {
        state.token = null;
        state.user = null;
        state.error = msg;
        sessionStorage.removeItem('token'); 
      }
    },
    clearTokenAndUser: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      sessionStorage.removeItem('token'); 
    },
  },
});

export const { setLoginApiResponse, clearTokenAndUser } = loginApiSlice.actions;

export const selectLoginApiResponse = (state) => state.loginApi;
export const selectToken = (state) => state.loginApi.token;

export default loginApiSlice.reducer;
