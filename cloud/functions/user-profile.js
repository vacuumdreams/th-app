module.exports = (db) => (record, context) => {
  const {
    uid,
    email,
    metadata: { firstName, lastName },
  } = record

  return db
    .collection('user')
    .doc(uid)
    .set({
      email,
      firstName,
      lastName,
    })
    .catch(console.error)
}
