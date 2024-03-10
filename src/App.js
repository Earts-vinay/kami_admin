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
import SideNav from './components/SideNav';

function App() {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <SideNav open={open} handleToggle={handleToggle} />
        <div style={{ marginLeft: open ? '250px' : '70px', padding: '10px', width: '100%', transition: 'margin 0.3s ease' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path="/" element={<Organization />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/myprofile" element={<MyProfile />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
