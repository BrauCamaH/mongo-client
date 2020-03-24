import React, { useContext, useState, useEffect } from 'react';
// core components
import DbContext from '../context/db-context';
import { Grid } from '@material-ui/core';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Toolbar,
  AlertDialog
} from '../components';

import send from '../utils/ipcRendererWrapper';
import { channels } from '../shared/constants';

const inputs = [{ id: 1, name: 'collection', text: 'Collection name' }];

const CollectionCard = props => {
  const { name, onDelete } = props;
  const [openAlert, setOpenAlert] = useState(false);
  return (
    <>
      <Card style={{ width: '20rem' }}>
        <CardHeader color='primary'>{name}</CardHeader>
        <CardBody>
          <Button color='danger' onClick={() => setOpenAlert(true)}>
            Delete
          </Button>
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

const DbPage = ({ match }) => {
  const context = useContext(DbContext);
  const [collections, setCollections] = useState([]);

  const {
    params: { name }
  } = match;

  const handleSubmit = values => {
    context.addDbWithCollection(values);
  };

  const getCollectionsWithDb = () => {
    send(
      channels.QUERY_DB,
      res => {
        setCollections(res.data);
      },
      { db: name, action: 'GET_COLLECTIONS', args: {} }
    );
  };

  useEffect(getCollectionsWithDb, []);

  return (
    <div>
      <Toolbar
        buttonText='Add collection'
        inputs={inputs}
        onSubmit={handleSubmit}
        dialogButtonText={'Create collection'}
      />
      <Grid container spacing={3}>
        {collections.map((coll, count) => (
          <Grid item key={count}>
            <CollectionCard name={coll.name} onDelete={() => {}} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DbPage;
