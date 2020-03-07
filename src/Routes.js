import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainView from './Views/Main';

import Layout from './layouts/Main';

const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path='/'
        render={matchProps => (
          <Layout>
            <MainView {...matchProps} />
          </Layout>
        )}
      />
    </Switch>
  );
};

export default Routes;
