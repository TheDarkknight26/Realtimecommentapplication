// app/components/CommentsList.jsx
'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Avatar, Divider } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import io from 'socket.io-client';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const socket = io('http://localhost:4000'); // Backend server URL

const CommentsList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch initial comments
    axios.get('http://localhost:4000/api/comments').then((response) => {
      setComments(response.data);
    });

    // Listen for new comments
    socket.on('newComment', (newComment) => {
      setComments((prevComments) => [newComment, ...prevComments]);
    });

    return () => {
      socket.off('newComment');
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3} mt={4} px={2} width="100%">
      {comments.map((comment) => (
        <Card key={comment.id} style={{ width: '80%', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2} mb={1}>
              <Avatar sx={{ bgcolor: blue[500] }}>
                <AccountCircleIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" color="text.primary" fontWeight="bold">
                  {comment.username}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(comment.timestamp).toLocaleString()}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Typography variant="body2" color="text.primary" mt={2} style={{ whiteSpace: 'pre-wrap' }}>
              {comment.comment}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CommentsList;