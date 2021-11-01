import { useQuery } from 'react-query';
import { fetchChannels, fetchChannelMessages } from './requests';
import { getChannels, getChannelMessages } from './selectors';
import { handleSelectors } from '../shared';

export const useGetChannels = ({
  selectors = { channels: getChannels },
  ...options
} = {}) =>
  useQuery('channels', fetchChannels, {
    select: handleSelectors(selectors),
    ...options,
  });

export const useGetChannelMessages = ({
  channelId,
  selectors = { messages: getChannelMessages },
  ...options
} = {}) =>
  useQuery(['channelMessages', { channelId }], fetchChannelMessages, {
    select: handleSelectors(selectors),
    ...options,
  });
