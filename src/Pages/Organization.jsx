
import React,{useState} from 'react'
import SideNav from '../components/SideNav'
import { Box } from '@mui/material';

const Organization = () => {

  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <div  style={{ display: 'flex' }}> 
       <SideNav open={open} handleToggle={handleToggle} />
      <div style={{ marginLeft: open ? '250px' : '70px', padding: '10px', width: '100%', transition: 'margin 0.3s ease' }}>
      <Box sx={{ backgroundColor: "white", borderRadius: "10px", padding: "10px", margin: "10px" }}>
        organization
      </Box>
        </div>

    </div>
  )
}

export default Organization
