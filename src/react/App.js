import React, { useEffect } from 'react';
import './App.css';
import send from '../utils/ipcRendererWrapper';
import { channels } from '../shared/constants';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from '../Routes';
const browserHistory = createBrowserHistory();
function App() {
  useEffect(() => {
    send(channels.DBS, args => {
      const { dbs } = args;
      console.log(dbs);
    });
  }, []);

  return (
    <Router history={browserHistory}>
      <Routes />
    </Router>
  );
}

export default App;
