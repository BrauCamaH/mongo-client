import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, List } from '@material-ui/core';

import Collapsible from 'react-collapsible';

function toHexString(bytes) {
  return Array.from(bytes, (byte) =>
    ('00' + (byte & 0xff).toString(16)).slice(-2)
  ).join('');
}
const useStyles = makeStyles((theme) => ({
  expansionPanel: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    cursor: 'default',
  },
  listItem: {
    fontWeight: 'weight',
    color: 'gray',
    width: '100%',
    cursor: 'default',
  },
}));
export default ({ document }) => {
  const classes = useStyles();

  const getDocumentItems = (document) => {
    const items = [];
    Object.keys(document).forEach((key, index) => {
      switch (typeof document[key]) {
        case 'object':
          printObject(document[key], items, key);
          break;

        default:
          items.push(
            <List key={index}>
              <ListItem className={classes.listItem}>
                {`${key} : ${document[key]}`}
              </ListItem>
            </List>
          );
          break;
      }
    });
    return items;
  };

  const printObject = (obj, list, key) => {
    if(!obj){
      return
    }
    if (obj.id) {
      list.push(
        <List key={toHexString(obj.id)}>
          <ListItem className={classes.listItem}>
            {`${key} : ${toHexString(obj.id)}`}
          </ListItem>
        </List>
      );
    } else {
      list.push(
        <div key={key} className={classes.expansionPanel}>
          <List>
            <ListItem className={classes.listItem}>
              <Collapsible
                transitionTime={20}
                trigger={`${key} : ${obj.toString()}`}
              >
                {getObjectItems(obj)}
              </Collapsible>
            </ListItem>
          </List>
        </div>
      );
    }
  };

  const getObjectItems = (obj) => {
    const list = [];
    Object.keys(obj).forEach((key, index) => {
      if (typeof obj[key] === 'object') {
        printObject(obj[key], list, key);
      } else {
        list.push(
          <List key={index}>
            <ListItem className={classes.listItem}>
              {`${key} : ${obj[key].toString()}`}
            </ListItem>
          </List>
        );
      }
    });
    return list;
  };

  return getDocumentItems(document);
};
