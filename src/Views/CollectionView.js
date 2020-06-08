import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import ReactJsonView from 'react-json-view';

import { DocumentRenderer, Searchbar, Button, FormDialog } from '../components';

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
    top: 0,
    zIndex: 200,
  },
}));

const inputs = [{ id: 1, name: 'view', text: 'View Name' }];

const CollectionView = () => {
  let query = useQuery();
  const classes = useStyles();
  const [documents, setDocuments] = useState([]);
  const [open, setOpen] = useState(false);

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

  const handleValidation = (text) => {
    try {
      JSON.parse(text);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleViewCreation = () => {};

  return (
    <>
      <div className={classes.fixed}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>{query.get('db') + '.' + query.get('collection')}</p>
          <Button
            color='info'
            onClick={() => {
              setOpen(true);
            }}
          >
            ADD VIEW
          </Button>
        </div>
        <Searchbar onFind={handleFind} validator={handleValidation} />
      </div>
      <div>
        {documents.map((document, index) => (
          <List key={index} component='nav' className={classes.root}>
            <DocumentRenderer document={document} />
          </List>
        ))}
      </div>
      <FormDialog
        open={open}
        inputs={inputs}
        onClose={() => {
          setOpen(false);
        }}
        component={
          <div>
            <h5>Agregation Pipeline</h5>
            <ReactJsonView
              style={{ width: '20rem', height: '20rem' }}
              src={[]}
              onAdd={() => {}}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          </div>
        }
        onSubmit={handleViewCreation}
        submitButtonText='Create View'
      />
    </>
  );
};

export default CollectionView;
