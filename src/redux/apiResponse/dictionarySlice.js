import { createSlice } from '@reduxjs/toolkit';

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearData(state) {
      state.data = null;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure, clearData } = dictionarySlice.actions;

export default dictionarySlice.reducer;
