const { MongoClient } = require('mongodb');

const dbControllers = require('./db');
const uri =
  'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

const query = async (callback, args) => {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB
    await client.connect();

    // Make the appropriate DB calls
    return callback(client, args);
  } catch (e) {
    console.error(e);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
};

const queryDB = async (dbName, callback, args) => {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB
    await client.connect();

    const db = client.db(dbName);

    return callback(db, args);
  } catch (e) {
    console.error(e);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
};

const queryCollection = async (dbName, collectionName, callback, args) => {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB
    await client.connect();

    const db = client.db(dbName);

    const collection = db.collection(collectionName);

    return callback(collection, args);
  } catch (e) {
    console.error(e);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
};

const createCollection = async (dbName, collectionName) => {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB
    await client.connect();

    const collection = await client.db(dbName).createCollection(collectionName);
    return collection;
  } catch (e) {
    console.error(e);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
};

const getDbs = async () => {
  const databasesList = await query(dbControllers.getDbs, {});
  return databasesList;
};

module.exports = { getDbs, createCollection, query, queryDB, queryCollection };
