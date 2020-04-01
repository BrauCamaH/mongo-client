import { createContext } from 'react';

export default createContext({
  dbs: [],
  setDbs: dbs => {},
  deleteDb: db => {},
  addDbWithCollection: values => {},
  createCollection: collectionName => {},
  deleteCollection: (dbName, collectionName) => {}
});
