import React, { useCallback, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    borderTop: `1px solid ${theme.palette.common.black}`,
    padding: theme.spacing(2, 4),
  },
  chatInput: {
    width: '100%',
  },
  sendButton: {
    padding: theme.spacing(0, 2),
  },
}));

const ChatForm = () => {
  const classes = useStyles();
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    setMessage('');
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container className={classes.container}>
        <Grid item xs={10}>
          <TextField
            multiline
            className={classes.chatInput}
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
          />
        </Grid>
        <Grid item xs={2} className={classes.sendButton}>
          <Button
            type="submit"
            variant="contained"
            disabled={!message}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ChatForm;
