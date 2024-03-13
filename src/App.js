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


function App() {
  const [open, setOpen] = useState(true);


  return (
    <BrowserRouter>
      {/* <div style={{ display: 'flex' }}>
       
        <div style={{ marginLeft: open ? '250px' : '70px', padding: '10px', width: '100%', transition: 'margin 0.3s ease' }}> */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path="/" element={<OnboardingScreens />} />
            <Route path="/organization" element={<Organization />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settingsinside" element={<SettingsInside />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/organizationaddproperty" element={<OrganizationAddProperty/>} />
            

            {/* Property Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addproperty" element={<AddProperty />} />
            <Route path="/addpole" element={<AddPole/>} />

          </Routes>
        {/* </div>
      </div> */}
    </BrowserRouter>
  );
}

export default App;
