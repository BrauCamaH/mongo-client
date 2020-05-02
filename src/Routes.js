import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainView from './Views/MainView';
import DbView from './Views/DbView';
import DocumentsView from './Views/DocumentsView';

import Layout from './layouts/Main';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route
          exact
          path='/'
          render={(matchProps) => <MainView {...matchProps} />}
        />
        <Route
          exact
          path='/db'
          render={(matchProps) => <DbView {...matchProps} />}
        />
        <Route
          exact
          path='/documents'
          render={(matchProps) => <DocumentsView {...matchProps} />}
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
