import SideNav from '../SideNav';
import { Box} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSideNavOpen, toggleSideNav } from '../../redux/sidenav/sidenavSlice';

const HeaderLayout = ({children}) =>{
    const isOpen = useSelector(selectIsSideNavOpen);
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleSideNav());
      };

      
    return(
        <div style={{ display: 'flex' }}>
        <SideNav open={isOpen} handleToggle={handleToggle} />
        <div style={{
          marginLeft: isOpen ? "220px" : '90px',
          padding: '10px', width: '100%', transition: 'margin 0.3s ease'
        }}>
      <Box style={{ height: '93vh', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginLeft: '10px', marginRight: '10px',overflow:"auto" }}> 
       {children}
     </Box>
    </div>
    </div>
    )
}
export default HeaderLayout;