'use client';

import {
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Tooltip,
    Typography,
  } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';
  
  export default function CatchCard({ catchData, onDelete }) {
    const {
      id,
      species,
      length,
      weight,
      caught_at,
      location,
      image_url,
      title,
    } = catchData;
  
    return (
      <Card sx={{ height: '100%', maxHeight: 460, position: 'relative' }}>
        <Tooltip title="Delete Catch">
          <IconButton
            onClick={() => onDelete(id, image_url)}
            sx={{ position: 'absolute', top: 8, right: 8 }}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
  
        <CardMedia
          component="img"
          height="200"
          image={image_url || '/placeholder.jpg'}
          alt={species}
        />
  
        <CardContent>
          {title && <Typography variant="h5">{title}</Typography>}
          <Typography variant="h6">{species}</Typography>
          {length && <Typography>Length: {length} in</Typography>}
          {weight && <Typography>Weight: {weight} lb</Typography>}
          {caught_at && (
            <Typography>Date: {new Date(caught_at).toLocaleString()}</Typography>
          )}
          <Typography>Location: {location}</Typography>
        </CardContent>
      </Card>
    );
  }
  