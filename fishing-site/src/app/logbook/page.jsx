'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Toolbar,
  Tooltip,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';

export default function LogbookPage() {
  const [catches, setCatches] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleViewChange = (_, newView) => {
    if (newView !== null) setViewMode(newView);
  };

  const handleDelete = async (catchId, imageUrl) => {
    const confirm = window.confirm('Are you sure you want to delete this catch?');
    if (!confirm) return;

    //Delete image from Supabase
    if (imageUrl) {
      const fileName = imageUrl.split('/').pop();
      const { error: storageError } = await supabase.storage.from('fish').remove([fileName]);
      if (storageError) {
        console.log('Failed to delete image:', storageError.message);
      }
    }

    const { error: deleteError } = await supabase.from('fish').delete().eq('id', catchId);
    if (deleteError) {
      console.log('Failed to delete catch:', deleteError.message);
    }

    setCatches((prev) => prev.filter((c) => c.id !== catchId));
  };

  useEffect(() => {
    const fetchCatches = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from('fish')
        .select('*')
        .eq('user_id', user.id)
        .order('caught_at', { ascending: false });

      if (!error) {
        setCatches(data);
      } else {
        console.error('Error fetching catches:', error.message, error.details || error);
      }
    };

    fetchCatches();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4, overflowX: 'hidden' }}>
      <Typography variant="h4" gutterBottom>
        🎣 My Logbook
      </Typography>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: 'background.paper',
          py: 1,
          mb: 2,
          px: 2,
        }}
      >
        <ToggleButtonGroup value={viewMode} exclusive onChange={handleViewChange} size="small">
          <ToggleButton value="grid">Grid View</ToggleButton>
          <ToggleButton value="list">List View</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ mt: 4 }}>
        {catches.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
            No current catches logged. Get out there and reel something in! 🎣
          </Typography>
        ) : viewMode === 'grid' ? (
          <>
            <Box
              sx={{
                display: 'flex',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                gap: 2,
                pb: 2,
                px: 2,
                ml: 0,
                mr: 0,
                width: '100%',
                maxWidth: '100vw',
                WebkitOverflowScrolling: 'touch',
                scrollSnapType: 'x mandatory',
                '& > *': {
                  scrollSnapAlign: 'start', // 👈 makes each card snap into position
                  flexShrink: 0,
                },
              }}
            >
              {catches.map((c) => (
                <Box
                  key={c.id}
                  sx={{
                    minWidth: isMobile ? '85vw' : 300,
                    maxWidth: isMobile ? '85vw' : 400,
                    flexShrink: 0,
                    position: 'relative',
                  }}
                >
                  <Card sx={{ height: '100%', maxHeight: 460 }}>
                    <Tooltip title="Delete Catch">
                      <IconButton
                        onClick={() => handleDelete(c.id, c.image_url)}
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <CardMedia
                      component="img"
                      height="200"
                      image={c.image_url || '/placeholder.jpg'} // 👈 fallback image
                      alt={c.species}
                    />
                    <CardContent>
                      <Typography variant="h6">{c.species}</Typography>
                      {c.length && <Typography>Length: {c.length} in</Typography>}
                      {c.weight && <Typography>Weight: {c.weight} lb</Typography>}
                      {c.caught_at && (
                        <Typography>Date: {new Date(c.caught_at).toLocaleString()}</Typography>
                      )}
                      <Typography>Location: {c.location}</Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
            <Box sx={{ mt: 4 }}>{/* 🗺️ Map goes here */}</Box>
          </>
        ) : isDesktop ? (
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              {catches.map((c) => (
                <Box key={c.id} sx={{ mb: 2, position: 'relative' }}>
                  <Card>
                    <Tooltip title="Delete Catch">
                      <IconButton
                        onClick={() => handleDelete(c.id, c.image_url)}
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <CardMedia
                      component="img"
                      height="200"
                      image={c.image_url || '/placeholder.jpg'} // 👈 fallback image
                      alt={c.species}
                    />
                    <CardContent>
                      <Typography variant="h6">{c.species}</Typography>
                      {c.length && <Typography>Length: {c.length} in</Typography>}
                      {c.weight && <Typography>Weight: {c.weight} lb</Typography>}
                      {c.caught_at && (
                        <Typography>Date: {new Date(c.caught_at).toLocaleString()}</Typography>
                      )}
                      <Typography>Location: {c.location}</Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
            <Box sx={{ width: '40%', minWidth: 300 }}>{/* 🗺️ Map goes here */}</Box>
          </Box>
        ) : (
          // 📱 List View Mobile — No map
          <>
            {catches.map((c) => (
              <Box key={c.id} sx={{ mb: 2, position: 'relative' }}>
                <Card>
                  <Tooltip title="Delete Catch">
                    <IconButton
                      onClick={() => handleDelete(c.id, c.image_url)}
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <CardMedia
                    component="img"
                    height="200"
                    image={c.image_url || '/placeholder.jpg'} // 👈 fallback image
                    alt={c.species}
                  />
                  <CardContent>
                    <Typography variant="h6">{c.species}</Typography>
                    {c.length && <Typography>Length: {c.length} in</Typography>}
                    {c.weight && <Typography>Weight: {c.weight} lb</Typography>}
                    {c.caught_at && (
                      <Typography>Date: {new Date(c.caught_at).toLocaleString()}</Typography>
                    )}
                    <Typography>Location: {c.location}</Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Container>
  );
}
