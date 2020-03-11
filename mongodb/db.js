exports.getDbs = async (client, args) => {
  //console.log(args);
  const databasesList = await client
    .db()
    .admin()
    .listDatabases();

  return databasesList;
};

exports.createCollection = async (client, dbName, collectionName) => {
  const collection = await client.db(dbName).createCollection(collectionName);
  return collection;
};
