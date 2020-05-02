import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
// material-ui components
import { makeStyles } from '@material-ui/core/styles';
// core components
import DbContext from '../context/db-context';
import { Grid } from '@material-ui/core';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Toolbar,
  AlertDialog,
} from '../components';
import { cardTitle } from '../assets/jss/material-kit-react.js';

import { ArrowForward } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const styles = {
  cardTitle,
};

const useStyles = makeStyles(styles);

const inputs = [
  { id: 1, name: 'database', text: 'Database' },
  { id: 2, name: 'collection', text: 'Collection' },
];

const DbCard = (props) => {
  const { name, sizeOnDisk, onDelete } = props;
  const [openAlert, setOpenAlert] = useState(false);
  const classes = useStyles();
  return (
    <>
      <Card style={{ width: '20rem' }}>
        <CardHeader color='primary'>{name}</CardHeader>
        <CardBody>
          <h4 className={classes.cardTitle}>Size on disk {sizeOnDisk}</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button color='danger' onClick={() => setOpenAlert(true)}>
              Delete
            </Button>
            <NavLink to={`/db?name=${name}`}>
              <IconButton color='default'>
                <ArrowForward />
              </IconButton>
            </NavLink>
          </div>
        </CardBody>
      </Card>
      <AlertDialog
        title='Are you sure?'
        contentText={`The action will delete the database ${name}`}
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        onAgree={() => {
          onDelete(name);
        }}
        buttonText='Drop Database'
      />
    </>
  );
};

const MainView = () => {
  const context = useContext(DbContext);

  const handleSubmit = (values) => {
    context.addDbWithCollection(values);
  };

  return (
    <div>
      <Toolbar
        buttonText='Add DATABASE'
        inputs={inputs}
        onSubmit={handleSubmit}
        dialogButtonText={'Create Database'}
      />
      <Grid container spacing={3}>
        {context.dbs.map((db, count) => (
          <Grid item key={count}>
            <DbCard
              name={db.name}
              sizeOnDisk={db.sizeOnDisk}
              onDelete={context.deleteDb}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MainView;
