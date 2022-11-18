import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactS3Uploader from 'react-s3-uploader';
import { Button } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ArrowDropDown, CloudUpload } from '@material-ui/icons';
import {
  removeProgramImages,
  updateProgramImages,
} from '../../services/Programs';
import { uploadImage } from '../../services/Assets';
import ConfirmDialog from '../ConfirmDialog';
import ViewImage from './ViewImage';
import createFeatured, {
  deleteFeaturedByProgramId,
} from '../../services/Featured';
import SnackbarMessage from '../SnackbarMessage';

const UploadImage = ({
  caption,
  name,
  programId,
  chapterId,
  value,
  episode,
}) => {
  const hiddenFileInput = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileSelected, setFileSelected] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [viewModel, setViewModel] = useState(false);
  const [snackbarMeesage, setSnackbarMeesage] = useState({
    show: false,
    type: '',
    message: '',
  });

  useEffect(() => {
    setImageURL(value);
  }, [value]);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const getSignedUrl = (file, callback) => {
    setSnackbarMeesage({
      message: '',
      type: '',
      show: false,
    });
    if (file.type.split('/')[0] === 'image') {
      const params = {
        objectName: file.name,
        contentType: file.type,
        programId,
        chapterId,
      };
      uploadImage(params)
        .then((res) => {
          callback(res.data);
          setFileSelected(true);
        })
        .catch(() => {
          setHasError(true);
          setErrorMessage('Something went wrong.');
        });
    } else {
      setSnackbarMeesage({
        message: `Please select image file only.`,
        type: 'error',
        show: true,
      });
    }
  };

  const onProgress = (p) => {
    setProgress(p);
  };
  const onError = (error) => {
    setHasError(true);
    setErrorMessage(error);
  };
  const onFinish = (data) => {
    const URL = data.publicUrl;
    setProgress(100);
    setProgress(0);
    setFileSelected(false);
    setImageURL(URL);

    updateProgramImages(programId, chapterId, {
      image: name,
      src: URL,
      chapterOnly: episode,
    });
    if (name === 'featuredImage') {
      createFeatured({ programId, url: URL });
    }
  };

  const handleManageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeImage = () => {
    removeProgramImages(programId, chapterId, {
      image: name,
      chapterOnly: episode,
    }).then(() => {
      if (name === 'featuredImage') {
        deleteFeaturedByProgramId(programId);
      }
      setConfirmDialog(false);
      setImageURL('');
    });
  };

  return (
    <>
      <ReactS3Uploader
        getSignedUrl={getSignedUrl}
        accept='image/*'
        onProgress={onProgress}
        onError={onError}
        onFinish={onFinish}
        uploadRequestHeaders={{
          'x-amz-acl': 'public-read',
        }}
        contentDisposition='auto'
        inputRef={hiddenFileInput}
        name={name}
        style={{ width: 0, height: 0, display: 'none' }}
      />

      {imageURL ? (
        <div>
          <Button onClick={handleClick} onClick={handleManageClick} button>
            {!fileSelected && `Upload New Image`}
            {!hasError &&
              fileSelected &&
              progress < 100 &&
              `File Uploading (${progress}%)`}
            {!hasError && fileSelected && progress === 100 && 'File Uploaded'}
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
          {!fileSelected && caption}
          {!hasError &&
            fileSelected &&
            progress < 100 &&
            `File Uploading (${progress}%)`}
          {!hasError && fileSelected && progress === 100 && 'File Uploaded'}
          {hasError && 'Error'}
        </Button>
      )}
    </>
  );
};

UploadImage.propTypes = {
  name: PropTypes.string.isRequired,
  imageId: PropTypes.number.isRequired,
};

export default UploadImage;
