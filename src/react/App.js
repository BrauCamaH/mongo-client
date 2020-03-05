import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { channels } from '../shared/constants';
const { ipcRenderer } = window;

function App() {
  const [appName, setAppName] = useState('');
  const [appVersion, setAppVersion] = useState('');

  useEffect(() => {
    ipcRenderer.send(channels.APP_INFO);
    ipcRenderer.on(channels.APP_INFO, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.APP_INFO);
      const { appName, appVersion } = arg;
      setAppName(appName);
      setAppVersion(appVersion);
    });
  }, []);

  return (
    <div className='App'>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            {appName} version {appVersion}
          </p>
        </header>
      </div>
    </div>
  );
}

export default App;
