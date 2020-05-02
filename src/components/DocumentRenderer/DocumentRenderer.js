import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';

import Collapsible from 'react-collapsible';

function toHexString(bytes) {
  return Array.from(bytes, (byte) =>
    ('00' + (byte & 0xff).toString(16)).slice(-2)
  ).join('');
}
const useStyles = makeStyles((theme) => ({
  expansionPanel: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    margin: theme.spacing(1),
    cursor: 'pointer',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
export default ({ document }) => {
  const classes = useStyles();

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
              {`${key} : ${document[key]}`}
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
        <ListItem key={toHexString(obj.id)}>
          <ListItemText secondary={`${key} : ${toHexString(obj.id)}`} />
        </ListItem>
      );
    } else {
      list.push(
        <div className={classes.expansionPanel}>
          <ListItem>
            <Collapsible
              transitionTime={20}
              trigger={`${key} : ${obj.toString()}`}
            >
              {getObjectItems(obj)}
            </Collapsible>
          </ListItem>
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
          <ListItem className={classes.heading}>
            {`${key} : ${obj[key].toString()}`}
          </ListItem>
        );
      }
    });
    return list;
  };

  return getDocumentItems(document);
};
