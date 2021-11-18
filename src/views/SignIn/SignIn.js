import React, { useCallback, useState } from 'react';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Button, FormControl, TextField } from '@mui/material';

const useStyles = makeStyles(() => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <Container>
      <div className={classes.container}>
        <form onSubmit={handleSubmit} data-testid="sign-in-form">
          <FormControl fullWidth>
            <TextField
              variant="outlined"
              label="Username"
              value={username}
              onChange={({ target: { value } }) => setUsername(value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <Button type="submit" variant="contained" disabled={!username}>
              Sign in
            </Button>
          </FormControl>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
