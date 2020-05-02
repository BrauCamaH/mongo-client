import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
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

import { ArrowForward } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import send from '../utils/ipcRendererWrapper';
import { channels } from '../shared/constants';

import useQuery from '../hooks/useQuery';

const inputs = [{ id: 1, name: 'collection', text: 'Collection name' }];

const CollectionCard = (props) => {
  const { dbName, name, onDelete } = props;
  const [openAlert, setOpenAlert] = useState(false);
  return (
    <>
      <Card style={{ width: '20rem' }}>
        <CardHeader color='primary'>{name} </CardHeader>
        <CardBody>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button color='danger' onClick={() => setOpenAlert(true)}>
              Delete
            </Button>
            <NavLink to={`/documents?db=${dbName}&&collection=${name}`}>
              <IconButton color='default'>
                <ArrowForward />
              </IconButton>
            </NavLink>
          </div>
        </CardBody>
      </Card>
      <AlertDialog
        title='Are you sure?'
        contentText={`The action will delete the collection ${name}`}
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        onAgree={() => {
          onDelete(dbName, name);
        }}
        buttonText='Drop Database'
      />
    </>
  );
};

const DbPage = () => {
  const context = useContext(DbContext);
  const [collections, setCollections] = useState([]);
  let query = useQuery();

  const name = query.get('name');

  const handleSubmit = (values) => {
    context.createCollection({ database: name, collection: values.collection });
    setCollections([...collections, { name: values.collection }]);
  };

  const handleDelete = (dbName, collectionName) => {
    context.deleteCollection(dbName, collectionName);
    getCollectionsWithDb();
  };

  const getCollectionsWithDb = () => {
    send(
      channels.QUERY_DB,
      (res) => {
        setCollections(res.data);
      },
      { db: name, action: 'GET_COLLECTIONS', args: {} }
    );
  };

  useEffect(getCollectionsWithDb, [name]);

  return (
    <div>
      <p>{name}</p>
      <Toolbar
        buttonText='Add collection'
        inputs={inputs}
        onSubmit={handleSubmit}
        dialogButtonText={'Create collection'}
      />
      <Grid container spacing={3}>
        {collections.map((coll, count) => (
          <Grid item key={count}>
            <CollectionCard
              dbName={name}
              name={coll.name}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DbPage;
