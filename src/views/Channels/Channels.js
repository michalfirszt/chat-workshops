import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import clsx from 'clsx';

import Sidebar, { drawerWidth } from '../../components/Sidebar';

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
  const [channelId, setChannelId] = useState(null);

  const data = { channels: [] };
  const isLoading = data.channels.length;

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
        {channelId ? <div>Chat</div> : <CircularProgress />}
      </main>
    </div>
  );
};

export default Channels;
