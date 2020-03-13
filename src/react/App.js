import React from 'react';
import './App.css';
import GlobalState from '../context/GlobalState';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from '../Routes';
const browserHistory = createBrowserHistory();
function App() {
  return (
    <Router history={browserHistory}>
      <GlobalState>
        <Routes />
      </GlobalState>
    </Router>
  );
}

export default App;
