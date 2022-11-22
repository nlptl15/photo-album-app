import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import { getImageById } from '../../services/Images';
import useToastr from '../../hooks/useToastr';
import { CircularProgress, Box } from '@mui/material';

export default function ImageDetails({ editId, onClose }) {
  const [imageData, setImageData] = useState();
  const [processing, setProcessing] = useState(true);

  const { showErrorToastr } = useToastr();

  useEffect(() => {
    setProcessing(true);
    try {
      getImageById(editId).then((result) => {
        if (result.success) {
          setImageData(result.data);
        }
        setProcessing(false);
      });
    } catch (error) {
      showErrorToastr(
        error?.response?.data?.message ||
          error?.message ||
          'Something went wrong.'
      );
      setProcessing(false);
    }
  }, []);

  return (
    <Dialog
      open
      onClose={onClose}
      scroll={'paper'}
      maxWidth='sm'
      fullWidth
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      {processing ? (
        <Box display='flex' sx={{ p: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <DialogTitle id='scroll-dialog-title'>{imageData.title}</DialogTitle>
          <DialogContent dividers='paper'>
            <DialogContentText id='scroll-dialog-description' tabIndex={-1}>
              test data
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Close</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
