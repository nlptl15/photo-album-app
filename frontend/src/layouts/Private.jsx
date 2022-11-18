import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router';
import { Box, Container } from '@mui/material';
import Navbar from '../components/common/Navbar';
import { LayoutWrapperStyles } from '../theme/styles/layout';

const useStyles = makeStyles(LayoutWrapperStyles);

const PrivateWrapper = ({ pageName, children }) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState();

  useEffect(() => {
    document.title = pageName;
  }, [history, pageName]);

  useEffect(async () => {
    if (!localStorage.getItem('isLoggedIn')) {
      history.push('/logout');
    }
  }, [pageName]);

  return (
    <Box className={classes.wrapper}>
      <Navbar title={pageName} open={open} setOpen={setOpen} />
      <Container
        sx={{ ...(open && { marginLeft: '240px', width: `calc(100% - 240px)` }) }}
        className={classes.content}
      >
        {children}
      </Container>
    </Box>
  );
};

PrivateWrapper.propTypes = {
  pageName: PropTypes.string,
  children: PropTypes.element.isRequired,
};
PrivateWrapper.defaultProps = {
  pageName: '',
};

export default PrivateWrapper;
