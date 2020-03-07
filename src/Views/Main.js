import React from 'react';
// material-ui components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Card from '../components/Card/Card.js';
import CardBody from '../components/Card/CardBody.js';
import CardHeader from '../components/Card/CardHeader.js';
import Button from '../components/CustomButtons/Button.js';

import { cardTitle } from '../assets/jss/material-kit-react.js';

const styles = {
  cardTitle
};

const useStyles = makeStyles(styles);

const MainView = () => {
  const classes = useStyles();
  return (
    <Card style={{ width: '20rem' }}>
      <CardHeader color='primary'>Featured</CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>Special title treatment</h4>
        <p>
          With supporting text below as a natural lead-in to additional content.
        </p>
        <Button color='primary'>Do something</Button>
      </CardBody>
    </Card>
  );
};

export default MainView;
