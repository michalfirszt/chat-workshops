import React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  message: {
    margin: theme.spacing(2, 0),
  },
  messageContent: {
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    marginTop: theme.spacing(0.5),
    maxWidth: theme.spacing(50),
  },
}));

const MessageList = ({ messages }) => {
  const classes = useStyles();

  return (
    <Box data-testid="message-list">
      {messages.map((message, index) => (
        <Box key={index} className={classes.message}>
          <span>{message.username}</span>
          <Box className={classes.messageContent}>{message.content}</Box>
        </Box>
      ))}
    </Box>
  );
};

export default MessageList;
