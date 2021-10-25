import React from 'react';
import { Switch, Route } from 'react-router-dom';

import paths from './paths';
import { SignIn } from '../views';
import { useLocalStorage } from 'react-use';
import { userKeys } from '../constants';

const AppRoutes = () => {
  const [usernameKey] = useLocalStorage(userKeys.LOCAL_STORAGE_KEY);

  return (
    <Switch>
      {!usernameKey && (
        <Route path={paths.signIn}>
          <SignIn />
        </Route>
      )}
    </Switch>
  );
};

export default AppRoutes;
