const mongoose = require('mongoose');

function mongoConnect(mongoUrl) {
  mongoose.connect(mongoUrl).catch((error) => {
    console.log('Database initial connection error.', error.message);
  });

  const db = mongoose.connection;

  db.on('open', () => {
    console.log('Database is open.');
  });
  db.on('error', (error) => {
    console.log('Database connection error.', error.message);
  });
  db.on('connected', () => {
    console.log(`Connected to database '${db.name}'.`);
  });
  db.on('disconnected', () => {
    console.log('Database is disconnected.');
  });
  db.on('close', () => {
    console.log('Database connection is closed.');
  });

  return db;
}

module.exports = mongoConnect;
