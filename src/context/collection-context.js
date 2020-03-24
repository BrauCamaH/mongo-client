import { createContext } from 'react';

export default createContext({
  dbs: [],
  setDbs: collections => {},
  deleteDb: collection => {},
  addCollection: values => {}
});
