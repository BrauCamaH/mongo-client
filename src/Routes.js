import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainView from './Views/MainView';
import DbView from './Views/DbView';
import DocumentsView from './Views/DocumentsView';

import Layout from './layouts/Main';

const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path='/'
        render={(matchProps) => (
          <Layout>
            <MainView {...matchProps} />
          </Layout>
        )}
      />
      <Route
        exact
        path='/db/:name'
        render={(matchProps) => (
          <Layout>
            <DbView {...matchProps} />
          </Layout>
        )}
      />
      <Route
        exact
        path='/documents'
        render={(matchProps) => (
          <Layout>
            <DocumentsView {...matchProps} />
          </Layout>
        )}
      />
    </Switch>
  );
};

export default Routes;
