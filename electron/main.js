const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { channels, collection_actions } = require('../src/shared/constants');
const path = require('path');
const url = require('url');
const mongodb = require('./mongodb');
const DbControllers = require('./mongodb/db');
const CollectionControllers = require('./mongodb/collection');

const backup = require('mongodb-backup');

let mainWindow;
function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true,
    });
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadURL(startUrl);
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(channels.DBS, (event, args) => {
  console.log(args);
  mongodb.getDbs().then((dbs) => {
    event.sender.send(channels.DBS, {
      dbs: dbs,
    });
  });
});

ipcMain.on(channels.CREATE_COLLECTION, (event, args) => {
  const { database, collection } = args;
  mongodb
    .createCollection(database, collection)
    .then((collection) => {
      event.sender.send(channels.CREATE_COLLECTION, {
        status: 'ok',
        message: `Created db : ${database}`,
      });
    })
    .catch((err) => err);
});

ipcMain.on(channels.BACKUP_DB, async (event, args) => {
  const { db } = args;
  const uri = `mongodb://@localhost:27017/${db}`;
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
  });
  const dirPath = result.filePaths[0];
  console.log('directories selected', result.filePaths);

  const collections = await mongodb.queryDB(
    db,
    DbControllers.getCollections,
    {}
  );

  console.log(collections.map((coll) => coll.name));

  backup({
    uri,
    root: dirPath,
    collections: collections.map((coll) => coll.name),
    tar: `${db}.tar`,
    parser:"bson",
    callback: function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log('finish');
      }
    },
  });
});

//Query
ipcMain.on(channels.QUERY, (event, data) => {
  const { cb, args } = data;
  mongodb
    .queryDB(cb, args)
    .then((res) => {
      event.sender.send(channels.QUERY, {
        status: 'ok',
        res: res,
      });
    })
    .catch((err) => err);
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
    case 'DELETE_COLLECTION':
      cb = DbControllers.deleteCollection;
      break;
    default:
      break;
  }

  mongodb
    .queryDB(db, cb, args)
    .then((data) => {
      event.sender.send(channels.QUERY_DB, {
        status: 'ok',
        data: data,
      });
    })
    .catch((err) => err);
});

//Query Collection
ipcMain.on(channels.QUERY_COLLECTION, (event, req) => {
  const { db, collection, action, args } = req;

  let cb = () => {};
  switch (action) {
    case collection_actions.FIND_DOCUMENTS:
      cb = CollectionControllers.find;
      break;
    default:
      break;
  }

  mongodb
    .queryCollection(db, collection, cb, args)
    .then((data) => {
      event.sender.send(channels.QUERY_COLLECTION, {
        status: 'ok',
        data: data,
      });
    })
    .catch((err) => err);
});
