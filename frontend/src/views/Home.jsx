import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import PrivateWrapper from '../layouts/Private';
import useStyles from '../theme/styles/views/Todos';
import { deleteImageById, getImages } from '../services/Images';
import useToastr from '../hooks/useToastr';
import TextField from '@mui/material/TextField';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import ImageUploader from '../components/images/ImageUploader';
import { Delete } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import ConfirmImageDeleteDialog from '../components/images/ConfirmImageDeleteDialog';
import EditIcon from '@mui/icons-material/Edit';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const ImageGallery = () => {
  const classes = useStyles();
  const { showErrorToastr, showSuccessToastr } = useToastr();

  const [rows, setRows] = useState([]);
  const [reloadRows, setReloadRows] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openImageUploadForm, setOpenImageUploadForm] = useState(false);
  const [openImageDeleteDialog, setOpenImageDeleteDialog] = useState(false);
  const [confirmedPassword, setConfimedPassword] = useState('');

  const [processing, setProcessing] = useState(false);
  const [value, setValue] = React.useState(0);
  const [searchText, setSearchText] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const deleteImage = () => {
    setProcessing(true);
    deleteImageById(selectedImage, confirmedPassword)
      .then((result) => {
        if (result.success) {
          showSuccessToastr('Image deleted successfully.');
          setOpenImageDeleteDialog(false);
          setSelectedImage(null);
          setReloadRows(!reloadRows);
        } else {
          showErrorToastr(
            result?.data?.message || result?.message || 'Something went wrong.'
          );
          setOpenImageDeleteDialog(false);
          setSelectedImage(null);
          setReloadRows(!reloadRows);
        }
        setProcessing(false);
      })
      .catch((error) => {
        showErrorToastr(
          error?.response?.data?.message ||
            error?.message ||
            'Something went wrong. Please try again.'
        );
        setProcessing(false);
        setReloadRows(!reloadRows);
      });
  };

  useEffect(() => {
    getImages(0, searchText)
      .then((result) => {
        if (result.success) {
          const { data } = result;
          setRows(data?.images || []);
        }
      })
      .catch((error) => {
        showErrorToastr(
          error?.response?.data?.message ||
            error?.message ||
            'Something went wrong.'
        );
        setRows([]);
      });
  }, [reloadRows]);

  const searchList = () => {
    setReloadRows(!reloadRows);
  };

  const useStyles2 = makeStyles((theme) => ({
    outerDiv: {
      '&:hover': {
        '& $ImageListItemBar': {
          display: 'flex',
        },
      },
    },
    ImageListItemBar: (props) => ({
      display: 'none',
    }),
  }));

  const classes2 = useStyles2();

  const confirmDelete = (id) => {
    setSelectedImage(id);
    setConfimedPassword('');
    setOpenImageDeleteDialog(true);
  };

  const onEdit = (id) => {
    setSelectedImage(id);
    setOpenImageUploadForm(true);
  };

  return (
    <PrivateWrapper pageName='Image Album'>
      <div className={classes.filterLeft}>
        <div>
          <TextField
            name='search'
            variant='standard'
            id='search'
            autoFocus
            label='Search'
            margin='dense'
            sx={{ width: '600px' }}
            className={classes.searchInput}
            onChange={(e) => {
              setSearchText(e.target.value);
              searchList();
            }}
            value={searchText}
          />
        </div>
        <div className={classes.moveRight}>
          <Button
            variant='contained'
            style={{ marginRight: '20px' }}
            className={classes.searchFilterBtn}
            onClick={() => setReloadRows(!reloadRows)}
          >
            Refresh
          </Button>

          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={() => setOpenImageUploadForm(true)}
            className={classes.addNewBtn}
          >
            Add New
          </Button>
        </div>
      </div>
      <ImageList
        variant='woven'
        sx={{ width: '100%', height: '100%' }}
        cols={4}
        rowHeight={300}
      >
        {rows.map((item) => (
          <ImageListItem
            key={item.img}
            sx={{ m: 1 }}
            className={classes2.outerDiv}
          >
            <img
              crossorigin='anonymous'
              src={`${item.imageSrc}?w=248&fit=crop&auto=format`}
              srcSet={`${item.imageSrc}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading='lazy'
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.imageLabels}
              className={classes2.ImageListItemBar}
              actionIcon={
                <>
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                    onClick={() => confirmDelete(item.id)}
                  >
                    <Delete color='error' />
                  </IconButton>
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                    onClick={() => onEdit(item.id)}
                  >
                    <EditIcon />
                  </IconButton>
                </>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      {openImageUploadForm && (
        <ImageUploader
          editId={selectedImage}
          title={selectedImage ? 'Edit Image' : 'Add Image'}
          isOpen={openImageUploadForm}
          onSave={() => {
            setOpenImageUploadForm(false);
            setSelectedImage(null);
            setReloadRows(!reloadRows);
          }}
        />
      )}
      {openImageDeleteDialog && (
        <ConfirmImageDeleteDialog
          onClose={() => {
            setOpenImageDeleteDialog(false);
            setSelectedImage(null);
            setReloadRows(!reloadRows);
          }}
          onConfirm={deleteImage}
          processing={processing}
          value={confirmedPassword}
          setValue={setConfimedPassword}
        />
      )}
    </PrivateWrapper>
  );
};

export default ImageGallery;
