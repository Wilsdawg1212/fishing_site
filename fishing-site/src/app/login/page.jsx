'use client';

import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Call Supabase login API here
    console.log('Log In with:', email, password);
  };

  return (
    <Container maxWidth="sm">
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
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
          Log In
        </Button>
      </Box>
    </Container>
  );
}
