const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');
mongoose.set('strictQuery', false);//To remove stupid deprication warning in console.

const mongoConnect = async () => {
  try {
    await mongoose.connect(db);
    console.log("Mongo db Connected....")
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = mongoConnect;

