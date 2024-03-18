import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { sideNavSlice } from './sidenav/sidenavSlice';
import loginApiReducer from '../redux/apiResponse/loginApiSlice';
import authReducer from '../redux/apiResponse/authSlice';
import onboardingCompanyReducer from '../redux/onBoarding/onboardingCompanySlice.jsx';
import dictionaryReducer from '../redux/apiResponse/dictionarySlice';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import addpoleReducer from '../redux/apiResponse/addpoleSlice.js';

const rootReducer = combineReducers({
  sideNav: sideNavSlice.reducer,
  loginApi: loginApiReducer,
  auth: authReducer,
  dictionary: dictionaryReducer,
  onboardingcompany: onboardingCompanyReducer,
  addpoleApi: addpoleReducer

});

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['loginApi', 'onboardingcompany', 'dictionary'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
