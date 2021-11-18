import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
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

  const [username] = useLocalStorage(userKeys.LOCAL_STORAGE_KEY);
  const isListAtTheBottom =
    containerRef.current?.scrollHeight - containerRef.current?.scrollTop ===
    containerRef.current?.offsetHeight;

  const [messages, setMessages] = useState([]);

  const data = { messages: [] };
  const isLoading = data.messages.length;

  const listHeight = useMemo(
    () => windowHeight - height,
    [height, windowHeight]
  );

  const sendMessage = useCallback(({ message }) => {}, []);

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
