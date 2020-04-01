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

exports.getCollections = async (db, args) => {
  try {
    const collections = await db.listCollections().toArray();
    return collections;
  } catch (error) {
    return error;
  }
};

exports.createCollection = async (client, dbName, collectionName) => {
  const collection = await client.db(dbName).createCollection(collectionName);
  return collection;
};

exports.deleteCollection = async (db, args) => {
  try {
    const { collection } = args;
    const deleted = await db.collection(collection).drop();
    return deleted;
  } catch (error) {
    return error;
  }
};
