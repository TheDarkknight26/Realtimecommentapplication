'use client';

import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Paper } from '@mui/material';
import LoginForm from './components/LoginForm';
import CommentsList from './components/CommentsList';
import CommentForm from './components/CommentForm';

export default function HomePage() {
  const [username, setUsername] = useState('');
  return (
    <Container maxWidth="md" sx={{ mt: 14, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
          <Typography variant="h4" component="h1" color="primary" fontWeight="bold">
            Real-Time Comments
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={2}>
            Join the conversation and share your thoughts in real time!
          </Typography>
          <Box width="100%" display="flex" flexDirection="column" alignItems="center" gap={3}>
            {!username ? (
              <LoginForm setUsername={setUsername} />
            ) : (
              <>
                <CommentForm username={username} />
                <CommentsList />
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
