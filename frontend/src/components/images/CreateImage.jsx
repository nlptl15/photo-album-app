import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Controller, useForm } from 'react-hook-form';
import Validations from '../../utils/Validations';
import {
  createTodo,
  getImageById,
  updateImageById,
} from '../../services/Images';
import useToastr from '../../hooks/useToastr';
import { NativeSelect } from '@mui/material';
import ImageUploader from './ImageUploader';

const CreateImage = ({ title, onClose, editId, onSave }) => {
  const { control, handleSubmit, setValue } = useForm();
  const { showErrorToastr, showSuccessToastr } = useToastr();

  const [processing, setProcessing] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const onSubmit = async (data) => {
    try {
      setProcessing(true);
      if (editId) {
        const result = await updateImageById(editId, {
          title: data.title,
          labels: [],
          imageUrl,
        });
        if (result.success) {
          showSuccessToastr('Todo updated successfully.');
        } else {
          showErrorToastr(
            result?.data?.message || result?.message || 'Something went wrong.'
          );
        }
        setProcessing(false);
        onSave();
      } else {
        const result = await CreateImage({
          title: data.title,
          labels: [],
          imageUrl,
        });
        if (result.success) {
          showSuccessToastr('Image uploaded successfully.');
        } else {
          showErrorToastr(
            result?.data?.message || result?.message || 'Something went wrong.'
          );
        }
        setProcessing(false);
        onSave();
      }
      setProcessing(false);
    } catch (error) {
      showErrorToastr(
        error?.response?.data?.message ||
          error?.message ||
          'Something went wrong.'
      );
      setProcessing(false);
      onClose();
    }
  };

  useEffect(() => {
    if (editId) {
      getImageById(editId)
        .then((result) => {
          if (result.success) {
            const { data } = result;
            setValue('title', data.title);
            setImageUrl(data?.imageUrl);
            setValue('labels', data?.status || []);
          }
        })
        .catch((error) => {
          showErrorToastr(
            error?.response?.data?.message ||
              error?.message ||
              'Something went wrong.'
          );
          onClose();
        });
    }
  }, [editId]);

  return (
    <Dialog open fullWidth maxWidth='sm' onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form id='manage-image' onSubmit={handleSubmit(onSubmit)}>
          <Box display='flex' flexDirection='column'>
            <Controller
              control={control}
              id='title'
              name='title'
              rules={{ ...Validations.REQUIRED }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  margin='dense'
                  label='Title'
                  variant='outlined'
                  focused
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error?.message : null}
                />
              )}
            />
            <ImageUploader image={imageUrl} setImage={setImageUrl} />
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          type='submit'
          form='manage-image'
          autoFocus
          endIcon={processing && <CircularProgress size={25} />}
          disabled={processing}
          color='primary'
          variant='contained'
        >
          Save
        </Button>
        <Button onClick={onClose} variant='contained'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateImage;

CreateImage.propTypes = {
  editId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
