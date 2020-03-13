exports.getDbs = async (client, args) => {
  //console.log(args);
  const databasesList = await client
    .db()
    .admin()
    .listDatabases();

  return databasesList;
};

exports.deleteDb = async (db, args) => {
  try {
    await db.dropDatabase();
  } catch (error) {
    return error;
  }
};

exports.createCollection = async (client, dbName, collectionName) => {
  const collection = await client.db(dbName).createCollection(collectionName);
  return collection;
};
