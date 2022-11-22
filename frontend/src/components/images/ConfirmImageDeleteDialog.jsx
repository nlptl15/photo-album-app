import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';

const ConfirmImageDeleteDialog = ({
  onClose,
  onConfirm,
  processing,
  value,
  setValue,
}) => (
  <Dialog open>
    <DialogTitle>Delete Image</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Please enter your password to delete image.
      </DialogContentText>
      <TextField
        margin='dense'
        label='Password'
        variant='standard'
        focused
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onConfirm}
        autoFocus
        endIcon={processing && <CircularProgress size={25} />}
        disabled={processing}
        color='error'
        variant='contained'
      >
        Confrim
      </Button>
      <Button onClick={onClose} variant='contained'>
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmImageDeleteDialog;
