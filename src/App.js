import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Organization from './Pages/Organization';
import Devices from './Pages/Devices';
import Users from './Pages/Users';
import Settings from './Pages/Settings';
import Login from './Pages/Login';
import MyProfile from './Pages/MyProfile';
import ForgotPass from './components/LoginScreens/ForgotPass';
import OnboardingScreens from './Pages/OnboardingScreens';
import SettingsInside from './components/SettingsContent/SettingsInside';
import OrganizationAddProperty from './components/OrganizationContent/OrganizationAddProperty';
import OrganizationPole from './components/OrganizationContent/OrganizationPole';
import OrganizationAddPole from './components/OrganizationContent/OrganizationAddPole';


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
            </Routes>
        {/* </div>
      </div> */}
    </BrowserRouter>
  );
}

export default App;
