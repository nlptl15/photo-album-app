import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ImageTile({ imageData, onEdit, onDelete, onView }) {
  return (
    <Card sx={{ minWidth: 275, my: 2 }}>
      <>
        <CardContent>
          <Typography variant='h5' component='div'>
            {imageData.title}
          </Typography>
          <Typography variant='body2'>test data</Typography>
        </CardContent>
        <CardActions>
          <List sx={{ p: 0, display: 'flex' }}>
            <ListItem button onClick={onEdit}>
              <ListItemIcon>
                <EditIcon fontSize='medium' color='primary' />
              </ListItemIcon>
            </ListItem>
            <ListItem button onClick={onView}>
              <ListItemIcon>
                <VisibilityIcon fontSize='medium' color='secondary' />
              </ListItemIcon>
            </ListItem>
            <ListItem button onClick={onDelete}>
              <ListItemIcon>
                <DeleteIcon fontSize='medium' color='error' />
              </ListItemIcon>
            </ListItem>
          </List>
        </CardActions>
      </>
    </Card>
  );
}
