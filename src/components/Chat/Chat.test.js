import { fireEvent, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WS from 'jest-websocket-mock';
import MockAdapter from 'axios-mock-adapter';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';

import Chat from './Chat';
import { theme } from '../../theme';
import client from '../../api/client';
import { channelMessages } from '../../constants/tests';

let ws;
const mock = new MockAdapter(client);
const queryClient = new QueryClient();

beforeEach(() => {
  ws = new WS('ws://localhost:8080');
});

afterEach(() => {
  WS.clean();
});

const renderComponent = (channelId = 1) => {
  window.HTMLElement.prototype.scrollTo = jest.fn();
  mock
    .onGet(`/channels/${channelId}/messages`)
    .reply(200, channelMessages[channelId]);

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Chat channelId={channelId} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

test('should send a message', async () => {
  const { getByTestId } = renderComponent();

  await ws.connected;

  expect(getByTestId('chat-container')).toBeInTheDocument();

  const messageInput = getByTestId('message-input');
  const chatForm = getByTestId('chat-form');
  const messagesList = getByTestId('message-list');

  userEvent.type(messageInput, 'chat message');
  fireEvent.submit(chatForm);

  ws.send(
    JSON.stringify({
      type: 'message',
      payload: {
        id: 3,
        channelId: 1,
        content: 'chat message',
        username: 'user',
      },
    })
  );

  expect(within(messagesList).getByText('chat message')).toBeInTheDocument();
});
