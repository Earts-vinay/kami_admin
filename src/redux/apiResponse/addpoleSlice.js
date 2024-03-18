import { createSlice } from '@reduxjs/toolkit';

export const AddPoleSlice = createSlice({
  name: 'addpoleApi',
  initialState: { token: sessionStorage.getItem('token') || null, user: null, error: null },
  reducers: {
    setAddPoleApiResponse: (state, action) => {
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

export const { setAddPoleApiResponse, clearTokenAndUser } = AddPoleSlice.actions;

export const selectPoleApiResponse = (state) => state.addpoleApi;
export const selectToken = (state) => state.addpoleApi.token;

export default AddPoleSlice.reducer;
