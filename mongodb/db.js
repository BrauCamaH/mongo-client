exports.getDbs = async client => {
  databasesList = await client
    .db()
    .admin()
    .listDatabases();

  return databasesList;
};
