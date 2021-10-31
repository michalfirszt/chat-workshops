import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import clsx from 'clsx';

import { useGetChannels } from '../../api/chennels';
import Sidebar, { drawerWidth } from '../../components/Sidebar';
import Chat from '../../components/Chat';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    paddingLeft: drawerWidth,
    minWidth: '100%',
  },
  activeListItem: {
    backgroundColor: `${theme.palette.secondary.main}!important`,
  },
}));

const Channels = () => {
  const classes = useStyles();
  const { data, isLoading } = useGetChannels();
  const [channelId, setChannelId] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      setChannelId(data.channels[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div className={classes.container}>
      <Sidebar>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <List>
            {data.channels.map((channel, index) => (
              <ListItem
                button
                key={index}
                onClick={() => setChannelId(channel.id)}
                className={clsx(
                  channelId === channel.id && classes.activeListItem
                )}
              >
                <ListItemText>{channel.name}</ListItemText>
              </ListItem>
            ))}
          </List>
        )}
      </Sidebar>
      <main className={classes.content}>
        {channelId ? <Chat channelId={channelId} /> : <CircularProgress />}
      </main>
    </div>
  );
};

export default Channels;
