import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainView from './Views/MainView';
import DbView from './Views/DbView';
import CollectionView from './Views/CollectionView';
import MultipleCollectionsView from './Views/MultipleCollectionsView';

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
          render={(matchProps) => <CollectionView {...matchProps} />}
        />
        <Route
          exact
          path='/multiple'
          render={(matchProps) => <MultipleCollectionsView {...matchProps} />}
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
