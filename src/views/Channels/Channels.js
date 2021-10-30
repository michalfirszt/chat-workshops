import React from 'react';
import { makeStyles } from '@mui/styles';
import { CircularProgress, List, ListItem, ListItemText } from '@mui/material';

import { useGetChannels } from '../../api/chennels';
import Sidebar from '../../components/Sidebar';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
  },
}));

const Channels = () => {
  const classes = useStyles();
  const { data, isLoading } = useGetChannels();

  return (
    <div className={classes.container}>
      <Sidebar>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <List>
            {data.channels.map((channel, index) => (
              <ListItem key={index} button>
                <ListItemText>{channel.name}</ListItemText>
              </ListItem>
            ))}
          </List>
        )}
      </Sidebar>
      <main className={classes.content}>sidebar</main>
    </div>
  );
};

export default Channels;
