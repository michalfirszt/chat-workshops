import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Button, FormControl, TextField } from '@mui/material';

import { userKeys } from '../constants';
import paths from '../routes/paths';

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
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [usernameKey, setUsernameKey] = useLocalStorage(
    userKeys.LOCAL_STORAGE_KEY
  );

  useEffect(() => {
    if (usernameKey) {
      history.replace(paths.root);
    }
  }, [history, usernameKey]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (username) {
        setUsernameKey(username);
        history.push(paths.root);
      }
    },
    [history, username, setUsernameKey]
  );

  return (
    <Container>
      <div className={classes.container}>
        <form onSubmit={handleSubmit}>
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
