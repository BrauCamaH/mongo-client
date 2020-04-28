import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { Searchbar } from '../components';

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
    height: '15px',
  },
  fixed: {
    margin: theme.spacing(1),
    position: 'sticky',
    top: 28,
    zIndex: 200,
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

  const iterate = (obj, list) => {
    let count = 0;
    Object.keys(obj).forEach((key) => {
      if (list) {
        list.push(
          <ListItem key={count} className={classes.listItem}>
            <ListItemText secondary={`${key} : ${obj[key].toString()}`} />
          </ListItem>
        );
      }

      if (typeof obj[key] === 'object') {
        iterate(obj[key], list);
      }
      count++;
    });
  };

  const getDocumentItems = (document) => {
    const items = [];
    let count = 0;
    Object.keys(document).forEach((key) => {
      switch (typeof document[key]) {
        case 'object':
          printObject(document[key], items, key);
          break;

        default:
          items.push(
            <ListItem key={count} className={classes.listItem}>
              <ListItemText secondary={`${key} : ${document[key]}`} />
            </ListItem>
          );
          break;
      }

      count++;
    });
    return items;
  };

  const printObject = (obj, list, key) => {
    if (obj.id) {
      list.push(
        <ListItem key={obj.id} className={classes.listItem}>
          <ListItemText secondary={`${key} : ${toHexString(obj.id)}`} />
        </ListItem>
      );
    } else {
      list.push(
        <ListItem key={obj.id} className={classes.listItem}>
          <ListItemText secondary={`${key} : ${obj.toString()}`} />
        </ListItem>
      );
      iterate(obj, list);
    }
  };

  useEffect(() => {
    send(
      channels.QUERY_COLLECTION,
      (res) => {
        setDocuments(res.data);
        console.log(res.data);
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

  return (
    <>
      <div className={classes.fixed}>
        <p>{query.get('db') + '.' + query.get('collection')}</p>
        <Searchbar />
      </div>
      <div>
        {documents.map((document, index) => (
          <List key={index} component='nav' className={classes.root}>
            {getDocumentItems(document)}
          </List>
        ))}
      </div>
    </>
  );
};

export default DocumentsView;
