'use client';

import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, InputLabel, Alert } from '@mui/material';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LogCatchPage() {
  const [species, setSpecies] = useState('');
  const [length, setLength] = useState('');
  const [weight, setWeight] = useState('');
  const [location, setLocation] = useState('');
  const [caughtAt, setCaughtAt] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError('You must be logged in to log a catch.');
      return;
    }

    let image_url = null;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = '${user.id}-${Date.now()}.${fileExt}';
      const { data, error: uploadError } = await supabase.storage
        .from('fish')
        .upload(fileName, imageFile);

      if (uploadError) {
        setError('Image upload failed');
        return;
      }

      const { data: urlData } = supabase.storage.from('catches').getPublicUrl(fileName);

      imageUrl = urlData.publicUrl;
    }

    const { error: insertError } = await supabase.from('fish').insert([
        {
        user_id: user.id,
        species,
        length: length ? parseFloat(length) : null,
        weight: weight ? parseFloat(weight) : null,
        location: location || null,
        caught_at: caughtAt || null,
        image_url: imageUrl || null,
        }
    ])

    if (insertError) {
        setError(insertError.message);
      } else {
        router.push('/logbook');
      }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Log a Catch
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
        <InputLabel sx={{ mt: 2 }}>Image (optional)</InputLabel>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0])}
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>
          Submit Catch
        </Button>
      </Box>
    </Container>
  );
}
