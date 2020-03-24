const { app, BrowserWindow, ipcMain } = require('electron');
const { channels } = require('../src/shared/constants');
const path = require('path');
const url = require('url');
const mongodb = require('./mongodb');
const DbControllers = require('./mongodb/db');

let mainWindow;
function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true
    });
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.loadURL(startUrl);
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}
app.on('ready', createWindow);
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(channels.DBS, (event, args) => {
  console.log(args);
  mongodb.getDbs().then(dbs => {
    event.sender.send(channels.DBS, {
      dbs: dbs
    });
  });
});

ipcMain.on(channels.CREATE_COLLECTION, (event, args) => {
  console.log(args);

  const { database, collection } = args;
  mongodb
    .createCollection(database, collection)
    .then(collection => {
      event.sender.send(channels.CREATE_COLLECTION, {
        status: 'ok',
        message: `Created db : ${database}`
      });
    })
    .catch(err => err);
});

//Query
ipcMain.on(channels.QUERY, (event, data) => {
  const { cb, args } = data;
  mongodb
    .queryDB(cb, args)
    .then(res => {
      event.sender.send(channels.QUERY, {
        status: 'ok',
        res: res
      });
    })
    .catch(err => err);
});

//Query DB
ipcMain.on(channels.QUERY_DB, (event, req) => {
  const { db, action, args } = req;

  let cb = () => {};
  switch (action) {
    case 'DELETE':
      cb = DbControllers.deleteDb;
      break;
    case 'GET_COLLECTIONS':
      cb = DbControllers.getCollections;
      break;
    default:
      break;
  }

  mongodb
    .queryDB(db, cb, args)
    .then(data => {
      event.sender.send(channels.QUERY_DB, {
        status: 'ok',
        data: data
      });
    })
    .catch(err => err);
});

//Query Collection
ipcMain.on(channels.QUERY_COLLECTION, (event, data) => {
  const { db, collection, cb, args } = data;
  mongodb
    .queryDB(db, collection, cb, args)
    .then(res => {
      event.sender.send(channels.QUERY_COLLECTION, {
        status: 'ok',
        res: res
      });
    })
    .catch(err => err);
});
