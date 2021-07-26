const mongoose = require('mongoose')

const dbConnect = () => {
  try {
    mongoose.connect(process.env.DB_URI, {
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