'use client';

import { Box, Button, TextField, Typography, Container, Alert, Paper } from '@mui/material';
import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      router.push('/logbook');
    }
  };

  return (
    <Container maxWidth="sm" margin="2">
      <Paper elevation={2}>
        <Box p={4}>
          <Typography variant="h4" gutterBottom>
            Log In
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
              Log In
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
