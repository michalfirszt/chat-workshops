import React, { useMemo } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import paths from './paths';
import { Channels, SignIn } from '../views';
import { userKeys } from '../constants';

const AppRoutes = () => {
  const { pathname } = useLocation();
  const usernameKey = useMemo(
    () => localStorage.getItem(userKeys.LOCAL_STORAGE_KEY),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <Switch>
      <Route path={paths.signIn}>
        <SignIn />
      </Route>
      <Route path={paths.root}>
        {usernameKey ? <Channels /> : <Redirect to={paths.signIn} />}
      </Route>
    </Switch>
  );
};

export default AppRoutes;
