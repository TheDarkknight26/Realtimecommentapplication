'use client';

import { useState } from 'react';
import { Box, TextField, Button} from '@mui/material';


const LoginForm = ({ setUsername }) => {
  const [usernameInput, setUsernameInput] = useState('');

  const handleLogin = () => {
    if (usernameInput.trim() !== '') {
      setUsername(usernameInput);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <TextField
        label="Enter Username"
        variant="outlined"
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
