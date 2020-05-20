import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, Grid } from '@material-ui/core';

import { DocumentRenderer } from '../components';

import { Searchbar, Dropdown } from '../components';

import send from '../utils/ipcRendererWrapper';
import { channels, collection_actions } from '../shared/constants';

import useQuery from '../hooks/useQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  listItem: {
    height: '15px',
  },
  fixed: {
    position: 'sticky',
    top: 28,
    zIndex: 200,
  },
}));

const CollectionView = () => {
  let query = useQuery();
  const classes = useStyles();
  const [documents, setDocuments] = useState([]);
  const [collections, setCollections] = useState([]);
  const [collection, setCollection] = useState('system.version');

  const db = query.get('db');

  const getCollectionsWithDb = () => {
    send(
      channels.QUERY_DB,
      (res) => {
        setCollection(res.data[0].name);
        setCollections(res.data);
      },
      { db: db, action: 'GET_COLLECTIONS', args: {} }
    );
  };

  useEffect(() => {
    send(
      channels.QUERY_COLLECTION,
      (res) => {
        setDocuments(res.data);
      },
      {
        db: db,
        collection: collection,
        action: collection_actions.FIND_DOCUMENTS,
        args: {},
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(getCollectionsWithDb, []);

  const handleFind = (text) => {
    try {
      send(
        channels.QUERY_COLLECTION,
        (res) => {
          setDocuments(res.data);
        },
        {
          db: db,
          collection: collection,
          action: collection_actions.FIND_DOCUMENTS,
          args: text.trim() ? JSON.parse(text) : {},
        }
      );
    } catch (error) {
      alert('cannot convert string to json');
    }
  };

  const handleValidation = (text) => {
    try {
      JSON.parse(text);
      return true;
    } catch (error) {
      return false;
    }
  };

  const content = (
    <>
      <div className={classes.fixed}>
        <p>{query.get('db') + '.' + collection}</p>
        <Dropdown
          buttonText={collection}
          dropdownList={collections.map((collecction) => collecction.name)}
          onClick={(data) => {
            setCollection(data);
            getCollectionsWithDb();
          }}
        />
        <Searchbar onFind={handleFind} validator={handleValidation} />
      </div>
      <div>
        {documents.map((document, index) => (
          <List key={index} component='nav' className={classes.root}>
            <DocumentRenderer document={document} />
          </List>
        ))}
      </div>
    </>
  );

  return (
    <div>
      <Grid container direction='row'>
        <Grid item xs>
          {content}
        </Grid>
        <Grid item xs>
          {content}
        </Grid>
      </Grid>
    </div>
  );
};

export default CollectionView;
