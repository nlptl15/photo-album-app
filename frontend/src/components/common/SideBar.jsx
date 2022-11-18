import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/MenuOpen';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import RoutePaths from '../../configs/Routes';
import NavItem from './NavItem';

const SideBar = ({ open, onClose }) => (
  <Drawer
    open
    variant='persistent'
    anchor='left'
    onClose={onClose}
    sx={{
      width: 250,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        minWidth: 250,
        bgcolor: 'background.paper',
      },
    }}
  >
    <Stack
      direction='row'
      alignItems='center'
      sx={{
        height: 80,
        flexShrink: 0,
        px: 0.5,
        position: 'sticky',
        top: 0,
        //zIndex: 'appBar',
        backgroundColor: 'inherit',
        backgroundImage: 'inherit',
      }}
    ></Stack>

    <nav>
      <List disablePadding>
        <li>
          <NavItem to={RoutePaths.HOME.replace(':status', '')}>
            <ListItemIcon>
              <Inventory2OutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='All Images' />
          </NavItem>
        </li>

        <Divider variant='middle' sx={{ my: 1 }} />
        <li>
          <NavItem to={RoutePaths.LOGOUT}>
            <ListItemIcon>
              <ExitToAppOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </NavItem>
        </li>
      </List>
    </nav>
  </Drawer>
);

SideBar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SideBar;
