import client from '../client';

export const fetchChannels = () => client.get('/channels');
