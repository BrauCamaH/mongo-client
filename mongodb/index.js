const { MongoClient } = require('mongodb');

const dbControllers = require('./db');

const query = async callback => {
  const uri =
    'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB
    await client.connect();

    // Make the appropriate DB calls
    return callback(client);
  } catch (e) {
    console.error(e);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
};

getDbs = async () => {
  const databasesList = await query(dbControllers.getDbs);
  return databasesList;
};

module.exports = { getDbs };
