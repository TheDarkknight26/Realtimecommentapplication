'use client';

import { useState } from 'react';
import { Box, TextField, Button, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const CommentForm = ({ username }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim() !== '') {
      axios
        .post('http://localhost:4000/api/comments', { username, comment })
        .then(() => {
          setComment('');
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, width: '100%', maxWidth: 600, mt: 2 }}>
      <Box display="flex" flexDirection="column" gap={2} alignItems="center">
        <TextField
          label="Share your thoughts..."
          variant="outlined"
          multiline
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={handleSubmit}
          sx={{
            borderRadius: '8px',
            px: 3,
            py: 1,
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Post Comment
        </Button>
      </Box>
    </Paper>
  );
};

export default CommentForm;
