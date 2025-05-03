'use client';

import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useState } from 'react';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Call Supabase sign-up API here
    console.log('Sign Up with:', email, password);
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
