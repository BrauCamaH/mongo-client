import React, { useState, useEffect } from 'react';
import DbContext from './db-context';
import send from '../utils/ipcRendererWrapper';
import { channels } from '../shared/constants';

const GlobalState = props => {
  const [dbs, setDbs] = useState([]);

  const getDbs = () => {
    send(
      channels.DBS,
      res => {
        const { dbs } = res;
        setDbs(dbs.databases);
      },
      { messsage: 'Databases added' }
    );
  };
  useEffect(getDbs, []);

  const addDbWithCollection = values => {
    send(
      channels.CREATE_COLLECTION,
      res => {
        getDbs();
      },
      values
    );
  };

  const deleteDb = dbName => {
    send(
      channels.QUERY_DB,
      res => {
        const updatedItems = dbs.filter(db => {
          return db.name !== dbName;
        });
        setDbs(updatedItems);
      },
      { db: dbName, action: 'DELETE', args: {} }
    );
  };

  return (
    <DbContext.Provider
      value={{
        dbs: dbs,
        deleteDb: deleteDb,
        addDbWithCollection: addDbWithCollection
      }}
    >
      {props.children}
    </DbContext.Provider>
  );
};

export default GlobalState;
