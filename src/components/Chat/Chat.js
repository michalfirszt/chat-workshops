import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useGetChannelMessages } from '../../api/chennels';
import { useLocalStorage, useMeasure, useWindowSize } from 'react-use';

import ChatForm from './ChatForm';
import { userKeys } from '../../constants';

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
  const containerRef = useRef(null);
  const wsRef = useRef(null);
  const [username] = useLocalStorage(userKeys.LOCAL_STORAGE_KEY);

  const [messages, setMessages] = useState([]);
  const { data, isLoading } = useGetChannelMessages({ channelId });
  const listHeight = useMemo(
    () => windowHeight - height,
    [height, windowHeight]
  );

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('connected');
    };

    ws.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);

      switch (type) {
        case 'message': {
          if (channelId === payload.channelId) {
            setMessages((prevValue) => [...prevValue, payload]);
          }
          break;
        }
        default: {
          console.log(`Unknown response type: ${type}`);
          break;
        }
      }
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, [channelId]);

  const sendMessage = useCallback(
    ({ message }) => {
      wsRef.current.send(
        JSON.stringify({
          type: 'message',
          payload: {
            content: message,
            username,
            channelId,
          },
        })
      );
    },
    [channelId, username, wsRef]
  );

  useEffect(() => {
    if (!isLoading) {
      setMessages(data.messages);
    }
  }, [data?.messages, channelId, isLoading]);

  useEffect(() => {
    containerRef.current.scrollTo(0, messages.length * 100);
  }, [messages]);

  return (
    <Box className={classes.container}>
      <Box
        ref={containerRef}
        className={classes.messagesList}
        style={{ height: `${listHeight}px` }}
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
          <ChatForm onSubmit={sendMessage} />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
