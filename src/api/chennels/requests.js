import client from '../client';

export const fetchChannels = () => client.get('/channels');

export const fetchChannelMessages = ({ queryKey: [, param] }) =>
  client.get(`/channels/${param.channelId}/messages`);
