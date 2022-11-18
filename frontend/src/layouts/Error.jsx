import React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { ErrorWrapperStyles } from '../theme/styles/layout';

const useStyles = makeStyles(ErrorWrapperStyles);

const ErrorWrapper = ({ children }) => {
  const classes = useStyles();

  return (
    <Container className={classes.wrapper} maxWidth="xl">
      {children}
    </Container>
  );
};

ErrorWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ErrorWrapper;
