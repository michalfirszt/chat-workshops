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
import MessageList from './MessageList';
import { userKeys } from '../../constants';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
  },
  messageList: {
    overflowY: 'scroll',
    padding: theme.spacing(1, 2, 0),
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
  const isListAtTheBottom =
    containerRef.current?.scrollHeight - containerRef.current?.scrollTop ===
    containerRef.current?.offsetHeight;

  const [messages, setMessages] = useState([]);
  const { data, isLoading } = useGetChannelMessages({ channelId });
  const listHeight = useMemo(
    () => windowHeight - height,
    [height, windowHeight]
  );

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'connect',
          payload: {
            channelId,
          },
        })
      );
    };

    ws.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);

      switch (type) {
        case 'message': {
          setMessages((prevValue) => [...prevValue, payload]);
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
    if (isListAtTheBottom) {
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <Box className={classes.container} data-testid="chat-container">
      <Box
        ref={containerRef}
        className={classes.messageList}
        style={{ height: `${listHeight}px` }}
      >
        {isLoading ? <CircularProgress /> : <MessageList messages={messages} />}
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
