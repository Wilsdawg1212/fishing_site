'use client';

import { useState, useRef } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  InputLabel,
  Alert,
  Paper,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useTheme } from '@mui/material/styles';

export default function LogCatchPage() {
  const [title, setTitle] = useState('');
  const [species, setSpecies] = useState('');
  const [length, setLength] = useState('');
  const [weight, setWeight] = useState('');
  const [location, setLocation] = useState('');
  const [caughtAt, setCaughtAt] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const supabase = useSupabaseClient(); // gives access to session-aware client
  const user = useUser(); // gets current user object

  const router = useRouter();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Use session-aware Supabase and auth-helpers
    if (!user) {
      setError('You must be logged in to log a catch.');
      return;
    }

    console.log(user);
    let imageUrl = null;

    // 🔽 Upload image to Supabase Storage bucket "fish"
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('fish')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError.message, uploadError);
        setError(`Image upload failed: ${uploadError.message}`);
        return;
      }

      const { data: urlData } = supabase.storage.from('fish').getPublicUrl(filePath);
      imageUrl = urlData.publicUrl;
    }

    // 🔽 Insert the new catch into your "fish" table
    const { error: insertError } = await supabase.from('fish').insert([
      {
        user_id: user.id,
        species,
        length: length ? parseFloat(length) : null,
        weight: weight ? parseFloat(weight) : null,
        location,
        caught_at: caughtAt || null,
        image_url: imageUrl,
        title: title || null,
      },
    ]);

    if (insertError) {
      console.error('Insert error:', insertError.message, insertError);
      setError(insertError.message);
    } else {
      router.push('/logbook');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, ml: 2, mr: 2, pt: 4, pb: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Log a Catch
          </Typography>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Length (inches)"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            type="number"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Weight (lbs)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            type="number"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Date & Time"
            type="datetime-local"
            value={caughtAt}
            onChange={(e) => setCaughtAt(e.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ mb: 2 }} align="center">
            <Typography variant="subtitle1" gutterBottom>
              Catch Photo
            </Typography>

            <input
              type="file"
              accept="image/*"
              id="image-upload"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                setImageFile(file);

                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewUrl(reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />

            <label htmlFor="image-upload">
              <Button variant="contained" color='secondary' component="span" align="center">
                Select Image
              </Button>
            </label>

            {imageFile && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {imageFile.name}
              </Typography>
            )}
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {previewUrl && (
            <Box
              sx={{
                mt: 2,
                width: '100%',
                maxHeight: 300,
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <img src={previewUrl} alt="Preview" style={{ width: '100%', objectFit: 'cover' }} />
            </Box>
          )}


          <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>
            Submit Catch
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
