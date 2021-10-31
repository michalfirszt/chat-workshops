import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useGetChannelMessages } from '../../api/chennels';
import { useMeasure, useWindowSize } from 'react-use';
import ChatForm from './ChatForm';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
  },
  messagesList: {
    overflowY: 'scroll',
    padding: theme.spacing(1, 2, 0),
  },
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
  chatForm: {
    bottom: 0,
    position: 'fixed',
  },
}));

const Chat = ({ channelId }) => {
  const classes = useStyles();
  const { height: windowHeight } = useWindowSize();
  const [formContainerRef, { width }] = useMeasure();
  const [chatFormRef, { height }] = useMeasure();

  const [messages, setMessages] = useState([]);
  const { data, isLoading } = useGetChannelMessages({ channelId });

  useEffect(() => {
    if (!isLoading) {
      setMessages(data.messages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId, isLoading]);

  return (
    <Box className={classes.container}>
      <Box
        className={classes.messagesList}
        style={{ height: `${windowHeight - height}px` }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          messages.map((message, index) => (
            <Box key={index} className={classes.message}>
              <span>{message.username}</span>
              <Box className={classes.messageContent}>{message.content}</Box>
            </Box>
          ))
        )}
      </Box>
      <Box ref={formContainerRef}>
        <Box
          ref={chatFormRef}
          className={classes.chatForm}
          style={{ width: `${width}px` }}
        >
          <ChatForm />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
