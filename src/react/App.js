import React from 'react';
import './App.css';
// import { channels } from '../shared/constants';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from '../Routes';

// const { ipcRenderer } = window;
const browserHistory = createBrowserHistory();
function App() {
  // const [appName, setAppName] = useState('');
  // const [appVersion, setAppVersion] = useState('');

  // useEffect(() => {
  //   ipcRenderer.send(channels.APP_INFO);
  //   ipcRenderer.on(channels.APP_INFO, (event, arg) => {
  //     ipcRenderer.removeAllListeners(channels.APP_INFO);
  //     const { appName, appVersion } = arg;
  //     setAppName(appName);
  //     setAppVersion(appVersion);
  //   });
  // }, []);

  return (
    <Router history={browserHistory}>
      <Routes />
    </Router>
  );
}

export default App;
