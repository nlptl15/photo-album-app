import React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { LayoutWrapperStyles } from '../theme/styles/layout';

const useStyles = makeStyles(LayoutWrapperStyles);

const PublicWrapper = ({ children }) => {
  const classes = useStyles();

  return (
    <Container className={classes.wrapper} maxWidth="xl">
      {children}
    </Container>
  );
};

PublicWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PublicWrapper;
