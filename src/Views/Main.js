import React, { useContext } from 'react';
// material-ui components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Card from '../components/Card/Card';
import CardBody from '../components/Card/CardBody';
import CardHeader from '../components/Card/CardHeader';
import Button from '../components/CustomButtons/Button';
import DbContext from '../context/db-context';
import { Grid } from '@material-ui/core';

import { cardTitle } from '../assets/jss/material-kit-react.js';

const styles = {
  cardTitle
};

const useStyles = makeStyles(styles);

const MainView = () => {
  const context = useContext(DbContext);
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3}>
        {context.dbs.map((db, count) => (
          <Grid item key={count}>
            <Card style={{ width: '20rem' }}>
              <CardHeader color='primary'>{db.name}</CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>
                  Size on disk {db.sizeOnDisk}
                </h4>
                <Button color='warning'>Edit</Button>
                <Button color='danger'>Delete</Button>
              </CardBody>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MainView;
