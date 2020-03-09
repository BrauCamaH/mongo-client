import React, { useEffect, useState } from 'react';
import './App.css';
import send from '../utils/ipcRendererWrapper';
import { channels } from '../shared/constants';
import DbContext from '../context/db-context';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from '../Routes';
const browserHistory = createBrowserHistory();
function App() {
  const [dbs, setDbs] = useState([]);

  useEffect(() => {
    send(channels.DBS, args => {
      const { dbs } = args;
      console.log(dbs);
      setDbs(dbs.databases);
    });
  }, []);

  return (
    <Router history={browserHistory}>
      <DbContext.Provider
        value={{
          dbs: dbs
        }}
      >
        <Routes />
      </DbContext.Provider>
    </Router>
  );
}

export default App;
