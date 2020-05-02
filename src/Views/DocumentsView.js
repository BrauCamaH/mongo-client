import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';

import { DocumentRenderer } from '../components';

import { Searchbar } from '../components';

import send from '../utils/ipcRendererWrapper';
import { channels, collection_actions } from '../shared/constants';

import useQuery from '../hooks/useQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    margin: theme.spacing(1),
  },
  listItem: {
    height: '15px',
  },
  fixed: {
    margin: theme.spacing(1),
    position: 'sticky',
    top: 28,
    zIndex: 200,
  },
}));

const DocumentsView = () => {
  let query = useQuery();
  const classes = useStyles();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    send(
      channels.QUERY_COLLECTION,
      (res) => {
        setDocuments(res.data);
      },
      {
        db: query.get('db'),
        collection: query.get('collection'),
        action: collection_actions.FIND_DOCUMENTS,
        args: {},
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFind = (text) => {
    try {
      send(
        channels.QUERY_COLLECTION,
        (res) => {
          setDocuments(res.data);
        },
        {
          db: query.get('db'),
          collection: query.get('collection'),
          action: collection_actions.FIND_DOCUMENTS,
          args: text.trim() ? JSON.parse(text) : {},
        }
      );
    } catch (error) {
      alert('cannot convert string to json');
    }
  };

  return (
    <>
      <div className={classes.fixed}>
        <p>{query.get('db') + '.' + query.get('collection')}</p>
        <Searchbar onFind={handleFind} />
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
};

export default DocumentsView;
