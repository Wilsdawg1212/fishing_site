'use client';

import { Container, Typography, Button } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        🎣 Fishing Logbook
      </Typography>
      <Button variant="contained" color="primary">
        Add a Catch
      </Button>
    </Container>
  );
}
