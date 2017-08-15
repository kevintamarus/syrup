const Sequelize = require('sequelize');
// const url = require('./dbUrl');

const db = new Sequelize('postgres://vcfqixeu:j4fYrCKP9MbK07OMSpc-SYSKwSso_fsR@pellefant.db.elephantsql.com:5432/vcfqixeu', {
  pool: {
    max: 3,
    min: 0,
    idle: 10000
  },
});


db.authenticate()
  .then(() => 
    console.log('Successfully connected to DB')
  )
  .catch(err => 
    console.log('Could not connect to DB', err)
  )

module.exports = db;