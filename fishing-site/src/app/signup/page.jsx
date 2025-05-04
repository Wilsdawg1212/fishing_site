'use client';

import { Box, Button, TextField, Typography, Container, Alert } from '@mui/material';
import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
        setError(error.message);
    } else {
        router.push('/login');
    }

  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create an Account
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}
