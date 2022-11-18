import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import PropTypes from 'prop-types';
import UserMenu from './UserMenu';
import ThemeSwitch from './ThemeSwitch';
import { ColorModeContext } from '../../contexts/ColorContext';

export const TopBar = ({ open, openSideBar, title }) => {
  const colorMode = React.useContext(ColorModeContext);
  return (
    <AppBar
      position='sticky'
      color='inherit'
      sx={{
        height: 70,
        backgroundImage:
          'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
        '&::before': {
          content: "''",
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          bgcolor: 'background.default',
          transition: (theme) => theme.transitions.create('opacity'),
        },
        pl: (theme) => `max(env(safe-area-inset-left), ${theme.spacing(2)})`,
        transition: (theme) =>
          theme.transitions.create('padding-left', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
      }}
    >
      <Toolbar
        sx={{
          height: 70,
          minWidth: open ? '100%' : 0,
          maxWidth: 'none',
          '&&': {
            minHeight: 70,
            p: 0,
            pr: (theme) =>
              `max(env(safe-area-inset-right), ${theme.spacing(2)})`,
          },
        }}
      >
        <img src='./picture.png' alt='app_logo' height={60} width={60} />

        <Grow in key={title}>
          <Box
            sx={{
              flex: 1,
              overflowX: 'auto',
              userSelect: 'none',
            }}
          >
            <Typography
              variant='h6'
              component='h1'
              textAlign='center'
              sx={{ typography: { sm: 'h5' } }}
            >
              {title}
            </Typography>
          </Box>
        </Grow>

        <ThemeSwitch onChange={colorMode.toggleColorMode} />
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  open: PropTypes.bool.isRequired,
  openSideBar: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const Navbar = ({ title, setOpen, open }) => (
  <>
    <TopBar
      open={open}
      openSideBar={() => {
        setOpen(true);
      }}
      title={title}
    />
    {/* <SideBar onClose={() => setOpen(false)} open={open} setOpen={setOpen} title={title} /> */}
  </>
);

Navbar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Navbar;
