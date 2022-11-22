import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, FormControl, Box } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import useToastr from '../../hooks/useToastr';
import Validations from '../../utils/Validations';
import { CloudUpload } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getImageById, uploadImage } from '../../services/Images';
import ChipInput from 'material-ui-chip-input';
import TagsInput from '../common/TagsInput';
import { CircularProgress } from '@mui/material';

export default function ImageUploader({ onSave, title, editId }) {
  const imageRef = useRef();
  const { control, handleSubmit, setValue } = useForm();
  const { showErrorToastr, showSuccessToastr } = useToastr();

  const [file, setFile] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imageLabels, setImageLabels] = useState([]);
  const [dimageLabels, setDImageLabels] = useState([]);

  const onSubmit = async (data) => {
    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('title', data.title);
      formData.append('imageLabels', imageLabels.join(','));
      console.log(formData);
      if (editId) formData.append('imageId', editId);
      const result = await uploadImage(formData);

      if (result.success) {
        showSuccessToastr('Image uploaded successfully.');
      } else {
        showErrorToastr(
          result?.data?.message || result?.message || 'Something went wrong.'
        );
      }
      setProcessing(false);
      onSave();
    } catch (e) {
      console.log(e);
      setHasError(true);
      showErrorToastr(
        e?.data?.message ||
          e?.message ||
          e?.response?.message ||
          'Something went wrong.'
      );
      setErrorMessage(
        e?.message || e?.response?.message || 'Something went wrong.'
      );
    }
  };

  const handleClick = () => imageRef.current.click();
  const handleSelecetedTags = (tags) => setImageLabels(tags);

  useEffect(() => {
    setDataLoaded(false);
    if (editId) {
      setProcessing(true);
      getImageById(editId)
        .then((res) => {
          if (res.data.imageSrc) {
            setFileSelected(true);
            setValue('title', res?.data?.title || '');
            setImageURL(res?.data?.imageSrc);

            setDImageLabels(res?.data?.imageLabels?.split(',') || []);
          }
          setProcessing(false);
          setDataLoaded(true);
        })
        .catch((error) => {
          setErrorMessage(
            error?.message ||
              error?.response?.message ||
              'Something went wrong.'
          );
          setHasError(true);
          setProcessing(false);
          setDataLoaded(true);
        });
    } else {
      setDataLoaded(true);
    }
  }, []);
  return (
    <Dialog open fullWidth maxWidth='sm' onClose={onSave}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {dataLoaded ? (
          <>
            <form id='manage-image-form' onSubmit={handleSubmit(onSubmit)}>
              <input
                filename={file}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setFileSelected(true);
                }}
                type='file'
                hidden
                ref={imageRef}
                accept='image/*'
              ></input>
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
                    fullWidth
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
              <FormControl style={{ width: '100%', margin: '10px 0' }}>
                {/* <ChipInput
              variant='outlined'
              label='Labels'
              defaultValue={imageLabels}
              onAdd={(c) => {
                setImageLabels((ps) => [...ps, c]);
              }}
            /> */}
                <TagsInput
                  selectedTags={handleSelecetedTags}
                  fullWidth
                  variant='outlined'
                  id='lables'
                  tags={dimageLabels}
                  name='lables'
                  placeholder='Add label'
                  label='Labels'
                />
              </FormControl>

              {imageURL ? (
                <div>
                  <img
                    crossorigin='anonymous'
                    src={`${imageURL}?w=248&fit=crop&auto=format`}
                    srcSet={`${imageURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={title}
                    loading='lazy'
                  />
                  <Button
                    onClick={handleClick}
                    fullWidth
                    variant='outlined'
                    startIcon={<CloudUpload />}
                    title={errorMessage}
                  >
                    {!fileSelected && `Upload New Image`}
                    {!hasError && fileSelected && editId && 'Edit Image'}
                    {!hasError && fileSelected && !editId && 'File Uploaded'}
                    {hasError && 'Error'}
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleClick}
                  fullWidth
                  variant='outlined'
                  startIcon={<CloudUpload />}
                  title={errorMessage}
                >
                  {!fileSelected && `Upload New Image`}
                  {!hasError && fileSelected && 'File Uploaded'}
                  {hasError && 'Error'}
                </Button>
              )}
            </form>
          </>
        ) : (
          <Box display='flex' sx={{ p: 5 }}>
            <CircularProgress size={25} />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          disabled={hasError || !fileSelected}
          form='manage-image-form'
          type='submit'
          color='primary'
          variant='contained'
        >
          Submit
        </Button>
        <Button onClick={onSave}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

ImageUploader.propTypes = {
  title: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  editId: PropTypes.number.isRequired,
};
