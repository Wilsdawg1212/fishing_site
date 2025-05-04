'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { Box, Typography, Container, Card, CardContent, CardMedia } from '@mui/material';

export default function LogbookPage() {
  const [catches, setCatches] = useState([]);

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
    <Container>
      <Typography variant="h4" gutterBottom>
        🎣 My Logbook
      </Typography>

      <Box sx={{ mt: 4 }}>
        {catches.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
            No current catches logged. Get out there and reel something in! 🎣
          </Typography>
        ) : (
          catches.map((c) => (
            <Card key={c.id} sx={{ mb: 2 }}>
              {c.image_url && (
                <CardMedia component="img" height="200" image={c.image_url} alt={c.species} />
              )}
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
          ))
        )}
      </Box>
    </Container>
  );
}
