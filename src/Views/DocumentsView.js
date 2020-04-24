import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

import send from '../utils/ipcRendererWrapper';
import { channels, collection_actions } from '../shared/constants';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    margin: theme.spacing(1),
  },
  listItem: {
    height: '10px',
  },
}));

function toHexString(bytes) {
  return Array.from(bytes, (byte) =>
    ('00' + (byte & 0xff).toString(16)).slice(-2)
  ).join('');
}
const DocumentsView = () => {
  let query = useQuery();
  const classes = useStyles();
  const [documents, setDocuments] = useState([]);

  const iterate = (obj) => {
    const items = [];
    let count = 0;
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object') {
        iterate(obj[key]);
      }
      items.push(
        <ListItem key={count} className={classes.listItem}>
          <ListItemText secondary={`${key} : ${obj[key]}`} />
        </ListItem>
      );
      count++;
    });
    return items;
  };

  useEffect(() => {
    send(
      channels.QUERY_COLLECTION,
      (res) => {
        setDocuments(
          res.data.map((item) => ({
            ...item,
            _id: toHexString(item._id.id),
          }))
        );
      },
      {
        db: query.get('db'),
        collection: query.get('collection'),
        action: collection_actions.FIND_DOCUMENTS,
        args: {},
      }
    );
  }, [query]);

  return (
    <>
      <p>{query.get('db') + '.' + query.get('collection')}</p>
      {documents.map((document, index) => (
        <List key={index} component='nav' className={classes.root}>
          {iterate(document)}
        </List>
      ))}
    </>
  );
};

export default DocumentsView;
