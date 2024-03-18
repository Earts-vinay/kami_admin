import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import ForgotPass from './components/LoginScreens/ForgotPass';
import SettingsInside from './components/SettingsContent/SettingsInside';
import OrganizationAddProperty from './components/OrganizationContent/OrganizationAddProperty';
import Organization from './Pages/SuperAdmin/Organization';
import OnboardingScreens  from './Pages/SuperAdmin/OnboardingScreens';
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


function App() {
  const [open, setOpen] = useState(true);


  return (
    <BrowserRouter>
      {/* <div style={{ display: 'flex' }}>
       
        <div style={{ marginLeft: open ? '250px' : '70px', padding: '10px', width: '100%', transition: 'margin 0.3s ease' }}> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path="/onboard" element={<OnboardingScreens />} />

            {/* Super Admin Routes */}
            <Route path="/organization" element={<Organization />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/devicesinside" element={<DevicesInside />} />
            <Route path="/users" element={<Users />} />
            <Route path="/edituser" element={<EditUser />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settingsinside" element={<SettingsInside />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/organizationaddproperty" element={<OrganizationAddProperty/>} />
            

            {/* Property Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addproperty" element={<AddProperty />} />

            <Route path="/addproperty/:id" element={<AddProperty />} />
            <Route path="/addpole" element={<AddPole/>} />
            <Route path="/viewpole" element={<ViewPole/>} />
            <Route path="/pairdevice" element={<PairDevice/>} />
            <Route path="/devicesparing" element={<DevicesParing/>} />
        

          </Routes>
        {/* </div>
      </div> */}
    </BrowserRouter>
  );
}

export default App;
