import { render } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';

import Chat from './Chat';
import { theme } from '../../theme';
import client from '../../api/client';
import { channelMessages } from '../../constants/tests';

const mock = new MockAdapter(client);
const queryClient = new QueryClient();

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
