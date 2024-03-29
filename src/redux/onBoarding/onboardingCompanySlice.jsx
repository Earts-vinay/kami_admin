import { createSlice } from '@reduxjs/toolkit';

const onboardingCompanySlice = createSlice({
  name: 'onboardingcompany',
  initialState: {
    urls: [], 
  },
  reducers: {
    setUploadResponse: (state, action) => {
      console.log('Payload received:', action.payload);
      state.urls = action.payload.data.urls; 
    },
  },
});

export const { setUploadResponse } = onboardingCompanySlice.actions;

export const selectUrls = state => state.onboardingcompany.urls; 

export default onboardingCompanySlice.reducer;
