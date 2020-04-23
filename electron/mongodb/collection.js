exports.find = async (coll, args) => {
  try {
    const documents = await coll.find(args).toArray();
    return documents;
  } catch (error) {
    return error;
  }
};
