const mongoose = require('mongoose')
const { db } = require('../config/config')

const dbConnect = () => {
  try {
    mongoose.connect(db.db_uri, {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }) 
    console.log(`success to connect to db`);
  } catch (error) {
    console.log('failed to connect to db'); 
  }
}

module.exports = dbConnect