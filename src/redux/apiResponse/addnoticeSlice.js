import { createSlice } from '@reduxjs/toolkit';

export const AddNoticeSlice = createSlice({
  name: 'addnoticeApi',
  initialState: { token: sessionStorage.getItem('token') || null, user: null, error: null },
  reducers: {
    AddNoticeApiResponse: (state, action) => {
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

export const { AddNoticeApiResponse, clearTokenAndUser } = AddNoticeSlice.actions;

export const selectNoticeApiResponse = (state) => state.addnoticeApi;
export const selectToken = (state) => state.addnoticeApi.token;

export default AddNoticeSlice.reducer;
