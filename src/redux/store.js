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
import getPoleReducer from '../redux/apiResponse/poleSlice.js'
import deviceReducer from '../redux/deviceSlice.jsx'
import propertyReducer from '../redux/propertySlice.jsx'

const rootReducer = combineReducers({
  sideNav: sideNavSlice.reducer,
  loginApi: loginApiReducer,
  auth: authReducer,
  dictionary: dictionaryReducer,
  onboardingcompany: onboardingCompanyReducer,
  addpoleApi: addpoleReducer,
  getpole:getPoleReducer,
  device: deviceReducer,
  property: propertyReducer,
});

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['loginApi', 'onboardingcompany', 'dictionary', 'auth', 'property'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
