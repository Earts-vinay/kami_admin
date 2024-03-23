import { createSlice } from '@reduxjs/toolkit';
 
export const noticeSlice = createSlice({
  name: 'getnotice',
  initialState: {
    responseData: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchDataStart: state => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.responseData = action.payload;
 
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
 
export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = noticeSlice.actions;
 
export const selectResponseData= (state) => state.getpole.responseData;
console.log("selectResponseData", selectResponseData)
export const selectLoading = state => state.getpole.loading;
export const selectError = state => state.getpole.error;
 
export default noticeSlice.reducer;