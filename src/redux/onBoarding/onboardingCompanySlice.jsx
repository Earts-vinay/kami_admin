import { createSlice } from '@reduxjs/toolkit';

const onboardingCompanySlice = createSlice({
  name: 'onboardingcompany',
  initialState: {
    urls: [], // Initialize urls array
  },
  reducers: {
    setUploadResponse: (state, action) => {
      console.log('Payload received:', action.payload);
      state.urls = action.payload.data.urls; // Update urls array
    },
  },
});

export const { setUploadResponse } = onboardingCompanySlice.actions;

export default onboardingCompanySlice.reducer;
