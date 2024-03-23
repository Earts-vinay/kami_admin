import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';

import ForgotPass from './components/LoginScreens/ForgotPass';
import SettingsInside from './components/SettingsContent/SettingsInside';
import OrganizationAddProperty from './components/OrganizationContent/OrganizationAddProperty';
import Organization from './Pages/SuperAdmin/Organization';
import OnboardingScreens from './Pages/SuperAdmin/OnboardingScreens';
import Users from './Pages/SuperAdmin/Users';
import Settings from './Pages/SuperAdmin/Settings';
import MyProfile from './Pages/SuperAdmin/MyProfile';
import Devices from './Pages/SuperAdmin/Devices';
import Login from './Pages/Login';
import Dashboard from './Pages/PropertyAdmin/Dashboard';
import AddProperty from './components/Propertycomponents/DashboardContent/AddProperty';
import AddPole from './components/Propertycomponents/DashboardContent/AddPole';
import ViewPole from './components/Propertycomponents/DashboardContent/ViewPole';
import PairDevice from './components/Propertycomponents/DashboardContent/PairDevice/PairDevice';
import DevicesParing from './components/Propertycomponents/DashboardContent/PairDevice/PairDevicesSetup/DevicesParing';
import DeviceSetup from './components/Propertycomponents/DashboardContent/PairDevice/PairDevicesSetup/DeviceParingContent/DeviceSetup';
import DevicesInside from './components/DevicesContent/DevicesInside';
import EditUser from './components/UserContent/EditUser';
import { selectToken } from './redux/apiResponse/loginApiSlice';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { Button } from '@mui/base';

function App() {
  const token = useSelector(selectToken);
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        {token ? (
          <>
            {/* Super Admin Routes */}
            <Route path="/onboard" element={<OnboardingScreens />} />
            <Route path="/organization" element={<Organization />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/devicesinside" element={<DevicesInside />} />
            <Route path="/users" element={<Users />} />
            <Route path="/edituser" element={<EditUser />} />
            <Route path="/edituser/:id" element={<EditUser />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settingsinside/:propertyId" element={<SettingsInside />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/organizationaddproperty" element={<OrganizationAddProperty />} />
            {/* Property Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addproperty" element={<AddProperty />} />
            <Route path="/addproperty/:id" element={<AddProperty />} />
            <Route path="/addpole/:id" element={<AddPole />} />
            <Route path="/viewpole" element={<ViewPole />} />
            <Route path="/viewpole/:id" element={<ViewPole />} />
            <Route path="/pairdevice" element={<PairDevice />} />
            <Route path="/devicesparing" element={<DevicesParing />} />
          </>
        ) : (
          <React.Fragment>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",gap:"10px"}}>
            <Typography variant="h3">Session Time Out</Typography>
            <Link to="/" style={{ marginTop: "10px", padding: "10px 20px", backgroundColor: "#007acc", color: "#fff", borderRadius: "5px", textDecoration: "none", display: "inline-block" }}>Go to Login</Link>
            </div>
           
          </>
        }/>

          </React.Fragment>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
