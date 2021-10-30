import { useQuery } from 'react-query';
import { fetchChannels } from './requests';
import { getChannels } from './selectors';
import { handleSelectors } from '../shared';

export const useGetChannels = ({
  selectors = { channels: getChannels },
  ...options
} = {}) =>
  useQuery('channels', fetchChannels, {
    select: handleSelectors(selectors),
    ...options,
  });
