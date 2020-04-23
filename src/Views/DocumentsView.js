import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

import send from '../utils/ipcRendererWrapper';
import { channels, collection_actions } from '../shared/constants';
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

const DocumentsView = () => {
  const classes = useStyles();
  const [documents, setDocuments] = useState([]);

  const iterate = (obj) => {
    const items = [];
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object') {
        iterate(obj[key]);
      }
      items.push(
        <ListItem className={classes.listItem} button>
          <ListItemText secondary={`${key} : ${obj[key]}`} />
        </ListItem>
      );
    });
    return items;
  };

  useEffect(() => {
    send(
      channels.QUERY_COLLECTION,
      (res) => {
        console.log(res.data);

        setDocuments(
          res.data.map((item) => ({
            ...item,
            _id: item._id,
          }))
        );
      },
      {
        db: 'mongoose',
        collection: 'students',
        action: collection_actions.FIND_DOCUMENTS,
        args: {},
      }
    );
  }, []);
  return documents.map((document, index) => (
    <>
      <List key={index} component='nav' className={classes.root}>
        {iterate(document)}
      </List>
    </>
  ));
};

export default DocumentsView;
