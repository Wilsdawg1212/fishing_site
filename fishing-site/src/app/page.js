'use client';

import { Container, Typography, Button } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 1}}>
        🎣 Fishing Logbook
      </Typography>
      <Button variant="contained" color="primary">
        Add a Catch
      </Button>
    </Container>
  );
}
