import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import PrivateWrapper from '../layouts/Private';
import useStyles from '../theme/styles/views/Todos';
import CreateTodo from '../components/images/CreateImage';
import TabPanel from '../components/common/TabPanel';
import AppBar from '@mui/material/AppBar';
import { deleteImageById, getImages } from '../services/Images';
import ConfirmDialog from '../components/common/ConfirmDialog';
import useToastr from '../hooks/useToastr';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SwipeableViews from 'react-swipeable-views';
import TextField from '@mui/material/TextField';
import TodoTile from '../components/images/ImageTile';
import TodoDetails from '../components/images/ImageDetails';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import CreateImage from '../components/images/CreateImage';

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

  const [value, setValue] = React.useState(0);
  const [searchText, setSearchText] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const deleteTodo = () => {
    deleteImageById(selectedImage)
      .then((result) => {
        if (result.success) {
          showSuccessToastr('Todo deleted successfully.');
        } else {
          showErrorToastr(
            result?.data?.message || result?.message || 'Something went wrong.'
          );
        }

        setReloadRows(!reloadRows);
      })
      .catch((error) => {
        showErrorToastr(
          error?.response?.data?.message ||
            error?.message ||
            'Something went wrong. Please try again.'
        );

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

  return (
    <PrivateWrapper pageName='Image Gallery'>
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
            sx={{ mr: 2 }}
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
      <ImageList variant='quilted' cols={4}>
        {rows.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.imageSrc}?w=248&fit=crop&auto=format`}
              srcSet={`${item.imageSrc}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading='lazy'
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.author}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      {openImageUploadForm && (
        <CreateImage
          editId={selectedImage}
          title='Add Image'
          isOpen={openImageUploadForm}
          onSave={() => {
            setOpenImageUploadForm(false);
            setSelectedImage(null);
            setReloadRows(!reloadRows);
          }}
          onClose={() => {
            setOpenImageUploadForm(false);
            setSelectedImage(null);
            setReloadRows(!reloadRows);
          }}
        />
      )}
    </PrivateWrapper>
  );
};

export default ImageGallery;
